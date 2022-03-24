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
  currentUser:any = JSON.parse(localStorage.getItem('currentUser')??'{}');
  constructor() { }

  ngOnInit(): void {
  }

  cancelEvent(appointment: Appointment){
    this.onCancelEvent.emit(appointment.id);
  }
}
