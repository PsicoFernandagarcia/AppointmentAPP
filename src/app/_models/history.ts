import { Appointment } from "./appointment";

export class HistoryAppointment{
  month: string = '';
  monthIndex:number = -1;
  appointments:Appointment[] = [];
  cancelledAppointments:Appointment[] = [];


}