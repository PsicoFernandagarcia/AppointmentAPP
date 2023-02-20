import { Component, OnInit } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { HistoryAppointment }  from '../_models/history';
import { User } from '../_models/user';
import { AppointmentService } from '../_services/appointment.service';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  yearHistory : number = (new Date()).getFullYear();
  currentYear : number = (new Date()).getFullYear();
  appointments : Appointment[] = [];
  history : HistoryAppointment[] = [];
  historyFiltered : HistoryAppointment[] = [];
  isHost: boolean = false;
  currentUser:any = JSON.parse(localStorage.getItem('currentUser')??'{}');
  patients:User[] = [];
  patientSelected:any;
  patientSelectedCombo:number = 0;
  months = ["Enero", "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  constructor(
    private appointmentService:AppointmentService
    , private notificationService: NotificationService
    , private loadingService: LoadingService
  ) { 
    

  }

  ngOnInit(): void {
    this.isHost = localStorage.getItem('userRole') === "HOST";
    this.search();
  }

  addToHistory( appointment:Appointment){
    let monthIndex = appointment.dateFrom.getMonth();
    let ap = [];
    let cancelled = [];
    if(appointment.status === 'CANCELED') {
      cancelled.push(appointment);
    }else{
      ap.push(appointment);
    }
    let history = this.history.filter(h => h.monthIndex === monthIndex);
    if(history.length === 0){
      this.history.push({
        monthIndex: monthIndex,
        month: this.months[monthIndex],
        appointments: ap,
        cancelledAppointments:cancelled
      })
    }else{
      if(appointment.status ==='CANCELED')
        history[0].cancelledAppointments.push(appointment);
      else
        history[0].appointments.push(appointment);
    }
  }
  fillPatients(){
    this.patients = [];
    this.appointments.forEach(a =>{
      let p = this.patients.filter( pat => a.patientId === pat.id);
      if(p.length === 0){
        let u =new User(a.patientId,'','');
        u.name = '';
        u.lastName = a.patientName;
        this.patients.push(u);
      }
    });
  }

  fillHistory(){
    this.history = [];
    for(let i = 0 ; i < this.appointments.length;i++){
      this.addToHistory(this.appointments[i]);
    }
    this.historyFiltered = this.history;
    this.onPatientChange(this.patientSelected);
  }

  search(){
    this.appointments = [];
    this.loadingService.show();
    this.appointmentService.get(this.yearHistory).subscribe(appointments =>{
      this.appointments = appointments;
      this.fillHistory();
      this.fillPatients();
      this.loadingService.hide();
    })
  }

  changeYear(newYear:number){
    this.yearHistory = newYear;
    this.patientSelected = 0;
    this.patientSelectedCombo=0;
    this.search();
  }

  onPatientChange(p:any){
    this.patientSelected = p;
    this.historyFiltered = JSON.parse(JSON.stringify(this.history));
    if(!p || p === 0 ){
      this.sortHistory();
      return;
    } 
    this.historyFiltered.forEach(m =>{
      m.appointments = m.appointments.filter(a => a.patientId === p);
      m.cancelledAppointments = m.cancelledAppointments.filter(a => a.patientId === p);
    })
    this.historyFiltered = this.historyFiltered.filter(h => h.appointments.length >0 || h.cancelledAppointments.length>0);
    this.sortHistory();
  }
  sortHistory(){
    this.historyFiltered.sort((a,b)=>{
      if(a.monthIndex > b.monthIndex){
        return -1;
      }
      return 1;
    })
  }

  cancelAppointment(appointmentId:number){
    this.notificationService.confirmation("Esta es una cita pasada, está seguro que desea cancelarla?",()=>{
      const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
      this.loadingService.show();
      this.appointmentService.cancelAppointment(appointmentId,currentUser.id).subscribe(res=>{
        this.notificationService.success("Se ha cancelado la cita con exito");
        this.search();
        this.loadingService.hide();
      },erro=>{
        this.notificationService.error("Ocurrión un error al cancelar la cita");
        this.loadingService.hide();
      });
    },"Cancelar Cita",()=>{
    });
  }
}
