import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../_models/appointment';
import { Day } from '../_models/day';

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
  constructor() { }

  ngOnInit(): void {
    this.pendingAppointments = this.day.appointments.filter(a => a.status !== "CANCELED");
    this.cancelledAppointments = this.day.appointments.filter(a => a.status === "CANCELED");
  }

  cancelEvent(appointment: Appointment){
    this.onCancelEvent.emit(appointment.id);
  }
}
