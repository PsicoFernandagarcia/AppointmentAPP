import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Appointment, HostAppointment } from '../_models/appointment';
import { Availability } from '../_models/availability';
import { User } from '../_models/user';
import { AppointmentService } from '../_services/appointment.service';
import { AvailabilityService } from '../_services/availability.service';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/users.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  today: Date = new Date();
  nextMonthDate: Date = new Date();
  selectedDay: Date = new Date();
  prevSelectedDay: Date | null = new Date();
  currentYear: number = this.selectedDay?.getFullYear() ?? new Date().getFullYear();
  selectedMonthAvailabilities: any[] = [];
  daysInMonth: number = 0;
  firstDayInMonth: Date = new Date();
  lastDayInMonth: Date = new Date();
  minDate!: Date;
  maxDate!: Date;
  availabilitiesToRemove: Availability[] = [];
  availabilitySelected: Availability = new Availability(-1, 0, new Date(), 0, false, 0 , '');
  hosts: User[] = [];
  patients: User[] = [];
  isHost: boolean = false;
  disableSelectUser = new UntypedFormControl(false);
  userToAssignSelected: User = new User(0, '-', '');
  timezoneOffsetSelected: number = 0;
  hasAvailabilities:boolean = false;

  constructor(
    private availabilityService: AvailabilityService
    , private appointmentService: AppointmentService
    , private notificationService: NotificationService
    , private loadingService:LoadingService
    , private userService: UserService
  ) {
    this.nextMonthDate = new Date(this.today.getFullYear(),this.today.getMonth()+1);
   }

  async ngOnInit() {
    this.isHost = localStorage.getItem('userRole') === "HOST";
    this.loadingService.show();
    [this.hosts,this.patients] = await Promise.all([this.loadHosts(), this.loadPatients()]);
    this.checkIfUserHasAnyPreviousAppointment();
    this.loadDates();
  }

  checkIfUserHasAnyPreviousAppointment(){
    if(this.isHost) return;
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
    this.appointmentService.hasAnyPreviousAppointment(currentUser.id,this.hosts[0].id).subscribe(
      hasAnyPreviousAppointment=>{
        if(!hasAnyPreviousAppointment)
          this.notificationService.alert("Recuerde contactar a la psicóloga previo a la obtención de su primera cita","Atención");
    })
  }

  shouldDrawerBeOppened(): boolean {
    return window.innerWidth > 600;
  }

  removeDates = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  async loadDates() {
    this.minDate = new Date(this.currentYear - 1, 0, 1);
    this.maxDate = new Date(this.currentYear, 11, 31);
    const dt = this.selectedDay ?? new Date();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    this.daysInMonth = new Date(year, month + 1, 0).getDate();
    this.firstDayInMonth = new Date(year, month, 1);
    this.lastDayInMonth = new Date(year, month + 1, 1);
    this.loadDays();
    
    this.loadAvailabilities();
  }

  async loadHosts(): Promise<User[]> {
    return new Promise((resolve, reject) => {

      this.userService.getHosts().subscribe(users => {
        resolve(users);
      });
    });
  }

  async loadPatients(): Promise<User[]> {
    if (!this.isHost) return [];
    return new Promise((resolve, reject) => {
      this.userService.getPatients().subscribe(users => {
        resolve(users);
      });
    });
  }

  loadDays() {

    this.selectedMonthAvailabilities = [];
    for (let d = 0; d < this.daysInMonth; d++) {
      this.selectedMonthAvailabilities.push([]);
    }
  }

  loadAvailabilities() {
    this.loadingService.show();
    let dateFrom =  this.getDateToFilter();
    this.availabilityService.getAvailabilities(this.hosts[0].id, dateFrom, this.lastDayInMonth, true).subscribe(res => {
      res = res.filter(r => r.dateOfAvailability >= new Date());
      this.hasAvailabilities = res.length > 0;
      for (let i = 1; i <= this.daysInMonth; i++) {
        this.selectedMonthAvailabilities[i - 1] = [];
        const availabilities = res.filter(r => r.dateOfAvailability.getDate() === i);
        if (availabilities.length === 0) continue;
        availabilities.forEach(a => {
          this.selectedMonthAvailabilities[i - 1].push({
            "hour": a.dateOfAvailability.getHours(),
            "availability": a
          });
        })
      }
      this.loadingService.hide();
    }, err => {
      console.table(err);
    })
  }

  getDateToFilter():Date{
    if(this.today.getMonth() !== this.selectedDay.getMonth() || this.isHost){
      return this.firstDayInMonth;
    }
    let tomorrowsDate =  new Date();
    // tomorrowsDate.setDate(tomorrowsDate.getDate()+1);
     return tomorrowsDate;
  }

  onDateChange($event: Date | null) {
    if (this.prevSelectedDay?.getMonth() === this.selectedDay?.getMonth()) return;
    this.prevSelectedDay = this.selectedDay;
    this.loadDates();
  }
  
  changeDate(newDate:Date){
    this.prevSelectedDay = this.selectedDay;
    this.selectedDay = newDate;
    this.loadDates();
  }

  getIndexDate(index: number) {
    return new Date(this.selectedDay?.toString() ?? '').setDate(index);
  }

  selectAvailability(av: Availability) {
    this.availabilitySelected = av;
  }

  assignAppointment() {
    const dateTo = new Date(this.availabilitySelected.dateOfAvailability);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
    const appointment = new HostAppointment(
      `Nuevo turno con ${this.userToAssignSelected.name}`,
      this.availabilitySelected.dateOfAvailability,
      new Date(dateTo.setTime(dateTo.getTime() + (60 * 60 * 1000))),
      this.userToAssignSelected.email,
      this.timezoneOffsetSelected,
      currentUser.id,
      this.userToAssignSelected.id,
      this.userToAssignSelected.name,
      '',
      false,
      'CREATED',
      new Date(),
      this.availabilitySelected.id
    );
    this.appointmentService.saveHostAssignment(appointment).subscribe(app => {
      this.notificationService.success("se ha concretado su reserva");
      this.loadingService.hide();
      this.loadAvailabilities();
    });
  }

  saveAppointment() {
    this.loadingService.show();
    if (this.isHost) {
      this.assignAppointment();
      return;
    }
    if (this.availabilitySelected.id < 1) return;
    const userName = localStorage.getItem("userName") ?? '';
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
    const dateTo = new Date(this.availabilitySelected.dateOfAvailability);
    const appointment = new Appointment(
      0,
      `Nuevo turno con ${userName}`,
      this.availabilitySelected.dateOfAvailability,
      new Date(dateTo.setTime(dateTo.getTime() + (60 * 60 * 1000))),
      userName,
      currentUser.id,
      '',
      this.hosts[0].id,
      '',
      currentUser.id,
      `${currentUser.firstName} ${currentUser.lastName}`,
      '',
      false,
      'CREATED',
      new Date()
    );
    this.appointmentService.save(appointment, this.availabilitySelected.id).subscribe(app => {
      this.notificationService.success("se ha concretado su reserva");
      this.loadingService.hide();
      this.loadAvailabilities();
    });
  }

  onUserChange(value: number) {
    if(value === 0){
      this.userToAssignSelected = new User(0,'','');
      return;
    }
    this.userToAssignSelected = this.patients.filter(x => x.id === value)[0];
  }

  onCountryChange(value: number) {
    this.timezoneOffsetSelected = value;
  }
}
