import { Appointment } from "./appointment";
import { User } from "./user";


export class Payment {
  id!: number;
  paidAt!: Date;
  patientId!: number;
  patient!: User;
  hostId!: number;
  amount!: number;
  sessionsPaid!: number;
  sessionsLeft!: number;
  currency!:string;
  observations!:string;
  appointments:number[] = [];
  appointmentsPaid?:Appointment[] = [];

}

export class PaymentInformation{
   patientId!:number;
   hostId!:number;
   total!:number;
   currency!:string;
   month!: number;
   patientFullName!: string;
}


