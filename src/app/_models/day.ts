import { Appointment } from "./appointment";

export class Day{
  appointmentDate: Date;
  appointments: Appointment[];
  isSelectedInCalendar:boolean;

  constructor(_appointmentDate:Date, _appointments:Appointment[], _isSelectedInCalendar:boolean) {
    this.appointmentDate=_appointmentDate;
    this.appointments= _appointments;
    this.isSelectedInCalendar=_isSelectedInCalendar;
  }
}
