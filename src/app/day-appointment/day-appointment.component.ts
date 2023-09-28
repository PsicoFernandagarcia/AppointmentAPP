import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { Day } from '../_models/day';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-day-appointment',
  templateUrl: './day-appointment.component.html',
  styleUrls: ['./day-appointment.component.css']
})
export class DayAppointmentComponent implements OnInit {
  @Input() day:Day = new Day(new Date(),[],false);
  @Output() onCancelEvent = new EventEmitter<number>();
  pendingAppointments:Appointment[] = [];
  cancelledAppointments:Appointment[] = [];
  currentUser:any = JSON.parse(localStorage.getItem('currentUser')??'{}');
  isHost: boolean = false;
  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isHost = localStorage.getItem('userRole') === "HOST";
    this.pendingAppointments = this.day.appointments.filter(a => a.status !== "CANCELED");
    this.cancelledAppointments = this.day.appointments.filter(a => a.status === "CANCELED");
  }

  cancelEvent(appointment: Appointment){
    const diff = appointment.dateFrom.diffInHours(new Date());
    if(diff <=25 && !this.isHost){
      this.notificationService.alert("No es posible eliminar una cita que esté dentro de las próximas 24 horas. Por favor, contacte con la profesional.","Atención");
      return;
    } 

    this.onCancelEvent.emit(appointment.id);
  }
}
