import { Component, OnInit } from '@angular/core';
import { Availability } from '../_models/availability';
import { CalendarEvent } from '../_models/calendarEvent';
import { AvailabilityService } from '../_services/availability.service';
import { CalendarService } from '../_services/calendar.service';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';
import { AppointmentService } from '../_services/appointment.service';

@Component({
  selector: 'app-my-time',
  templateUrl: './my-time.component.html',
  styleUrls: ['./my-time.component.css'],
})
export class MyTimeComponent implements OnInit {
  today: Date = new Date();
  nextMonthDate: Date = new Date();
  selectedDay: Date = new Date();
  prevSelectedDay: Date | null = new Date();
  currentYear: number =
    this.selectedDay?.getFullYear() ?? new Date().getFullYear();
  selectedMonthAvailabilities: any[] = [];
  daysInMonth: number = 0;
  firstDayInMonth: Date = new Date();
  lastDayInMonth: Date = new Date();
  minDate!: Date;
  maxDate!: Date;
  availabilitiesToRemove: Availability[] = [];
  calendarEvents: CalendarEvent[] = [];
  constructor(
    private availabilityService: AvailabilityService,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private calendarService: CalendarService
  ) {
    this.nextMonthDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1
    );
  }

  ngOnInit(): void {
    this.loadDates();
    this.loadCalendarEvents();
  }

  loadDates() {
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

  loadCalendarEvents() {
    this.calendarService.getEvents(this.selectedDay).subscribe((events) => {
      this.calendarEvents = events;
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
    this.availabilityService
      .myAvailabilities(this.firstDayInMonth, this.lastDayInMonth)
      .subscribe(
        (res) => {
          for (let i = 1 ?? 1; i <= this.daysInMonth; i++) {
            this.selectedMonthAvailabilities[i - 1] = [];
            for (let hours = 1; hours < 24; hours++) {
              const availability = res.filter(
                (r) =>
                  r.dateOfAvailability.getDate() === i &&
                  r.dateOfAvailability.getHours() === hours
              );
              this.selectedMonthAvailabilities[i - 1].push({
                hour: hours,
                availability: availability.length > 0 ? availability[0] : null,
              });
            }
          }
          this.loadingService.hide();
        },
        (err) => {
          console.table(err);
          this.loadingService.hide();
        }
      );
  }

  shouldDrawerBeOppened(): boolean {
    return window.innerWidth > 600;
  }

  removeDates = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  getIndexDate(index: number) {
    return new Date(this.selectedDay?.toString() ?? '').setDate(index);
  }

  changeAvailabilityHour(dayNumber: number, hour: any) {
    if (hour.availability) {
      if (hour.availability.id)
        this.availabilitiesToRemove.push(hour.availability);
      hour.availability = null;
    } else {
      const availabilityRemoved = this.availabilitiesToRemove.filter(
        (x) =>
          x.dateOfAvailability.getDate() === dayNumber &&
          x.dateOfAvailability.getHours() === hour.hour
      );
      if (availabilityRemoved.length > 0) {
        hour.availability = availabilityRemoved[0];
        this.availabilitiesToRemove = this.availabilitiesToRemove.filter(
          (x) => x.id === hour.availability.id
        );
        return;
      }
      const date = new Date();
      date.setDate(10);
      date.setMonth(this.selectedDay?.getMonth() ?? 1);
      date.setDate(dayNumber);
      date.setHours(hour.hour);
      date.setMinutes(0);
      date.setMilliseconds(0);
      hour.availability = new Availability(0, 0, date, 60, true, 0, '');
    }
  }

  saveAvailabilities(availabilitiesInDay: any[]) {
    this.loadingService.show();
    const itemsInDay = availabilitiesInDay.filter(
      (a) => a.availability && !a.availability.id
    );
    const availabilities: Availability[] = [];
    itemsInDay.forEach((i) => {
      availabilities.push(i.availability);
    });
    this.availabilityService
      .setAvailabilities(
        availabilities,
        this.availabilitiesToRemove.map((a) => a.id)
      )
      .subscribe(
        (res) => {
          this.notificationService.success(
            'Se ha configurado tu horario correctamente'
          );
          this.loadAvailabilities();
        },
        (err) => {
          console.log('err');
          this.loadingService.hide();
        }
      );
  }

  validateAppointmentsAndSetAvailabilities(availabilitiesInDay: any[]) {
    if (this.availabilitiesToRemove.filter(a => a.appointmentId > 0).length > 0) {
      var appointmets = '';
      this.availabilitiesToRemove.forEach(av => {
        if(av.appointmentId>0)
          appointmets += `<br>${av.dateOfAvailability.getHours()}hs ${av.appointmentWith}`;
      });
      this.notificationService.confirmation(
        `Está por cancelar horarios con turnos asignados.
        ${appointmets}
        `,
        () => {
          this.cancellAppointments(this.availabilitiesToRemove.filter(a => a.appointmentId > 0).map(a => a.appointmentId));
          this.saveAvailabilities(availabilitiesInDay);
        },
        'Atención!'
      );
    } else {
      this.saveAvailabilities(availabilitiesInDay);
    }
  }

  cancellAppointments(appointmentIdsToRemove: number[]){
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
    appointmentIdsToRemove.forEach(app => {
      this.appointmentService.cancelAppointment(app,currentUser.id).subscribe(res =>{
        console.log("cita cancelada con éxito");
      })
    });
  }
  onDateChange($event: Date | null) {
    if (this.prevSelectedDay?.getMonth() === this.selectedDay?.getMonth())
      return;
    this.prevSelectedDay = this.selectedDay;
    this.loadDates();
  }
  changeDate(newDate: Date) {
    this.prevSelectedDay = this.selectedDay;
    this.selectedDay = newDate;
    this.loadDates();
    this.loadCalendarEvents();
  }
}
