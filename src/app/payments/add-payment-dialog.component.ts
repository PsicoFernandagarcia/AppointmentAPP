import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "../_models/payment";
import { LoadingService } from "../_services/loading.service";
import { NotificationService } from "../_services/notification.service";
import { PaymentService } from "../_services/payments.service";
import { AppointmentService } from "../_services/appointment.service";
import { Appointment } from "../_models/appointment";
import { Observable, of } from "rxjs";
import { MatCheckboxChange } from "@angular/material/checkbox";

export class AddPaymentData{
  payment!: Payment;
  editPayment: boolean=false;
}
@Component({
  selector: 'add-payment',
  templateUrl: 'add-payment-dialog.html',
  styleUrls: ['add-payment-dialog.css']
})
export class AddPaymentDialog {
  newPayment:Payment = new Payment();
  appointments!: Observable<Appointment[]>;
  date:any;
  constructor(
    private paymentService:PaymentService
    ,private notificationService:NotificationService
    ,private appointmentService:AppointmentService
    ,private loadingService : LoadingService
    ,public dialogRef: MatDialogRef<AddPaymentDialog>
    ,@Inject(MAT_DIALOG_DATA) public data: AddPaymentData
  ) {
    this.newPayment = JSON.parse(JSON.stringify(data.payment));
    this.newPayment.currency = !this.newPayment.currency ? "EUR" : this.newPayment.currency;
    const appointmentsPaid = data.payment.appointmentsPaid?.map((a) => a.id) ?? [];
    this.newPayment.appointments = (this.newPayment.appointments ?? []).concat(appointmentsPaid);
    this.date = this.data.editPayment ?  new Date(this.newPayment.paidAt) : new Date();
    this.loadAppointments();
  }

  loadAppointments(){
    this.appointmentService.getUnpaidFromPatient(this.data.payment.patientId).subscribe(app => {
        const appointments = (this.data.payment.appointmentsPaid ?? []).concat(app);
        this.appointments = of(appointments);

      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.newPayment = new Payment();
  }

  savePayment(){
    if(this.newPayment.sessionsPaid < 0
        || !this.newPayment.currency 
      ){
        this.notificationService.alert("Debe completar todos los datos");
        return;
    }
    this.date._d?.setHours(12);
    this.newPayment.paidAt = this.date._d ?? this.date;
    if(this.data.editPayment){
      this.editPayment();
    }else{
      this.loadingService.show();
      this.newPayment.sessionsPaid = this.newPayment.appointmentsPaid?.length ?? 0;
      this.paymentService.save(this.newPayment).subscribe(res=>{
        this.notificationService.success("Pago registrado!");
        this.loadingService.hide;
        this.dialogRef.close(res);
      });
    }
  }
  editPayment(){
    this.loadingService.show();
    this.newPayment.sessionsPaid = this.newPayment.appointmentsPaid?.length ?? 0;
    this.paymentService.edit(this.newPayment).subscribe(res=>{
      this.notificationService.success("Pago actualizado!");
      this.loadingService.hide;
      this.dialogRef.close(res);
    });
  }

  onAppointmentSelected(event: MatCheckboxChange, appointment: Appointment){
    if(this.newPayment.appointments.some(a => a === appointment.id)){
      this.newPayment.appointments = this.newPayment.appointments.filter(a => a !== appointment.id);
    }else{
      this.newPayment.appointments.push(appointment.id);
    }
  }
}