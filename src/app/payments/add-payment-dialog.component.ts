import { ThisReceiver } from "@angular/compiler";
import { Component, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { Payment } from "../_models/payment";
import { User } from "../_models/user";
import { LoadingService } from "../_services/loading.service";
import { NotificationService } from "../_services/notification.service";
import { PaymentService } from "../_services/payments.service";

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
  date:any;
  constructor(
    private paymentService:PaymentService
    ,private notificationService:NotificationService
    ,private loadingService : LoadingService
    ,public dialogRef: MatDialogRef<AddPaymentDialog>
    ,@Inject(MAT_DIALOG_DATA) public data: AddPaymentData
  ) {
    this.newPayment = JSON.parse(JSON.stringify(data.payment));
    this.newPayment.currency = !this.newPayment.currency ? "EUR" : this.newPayment.currency;
    this.date = this.data.editPayment ?  this.newPayment.paidAt : new Date();
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
      this.paymentService.save(this.newPayment).subscribe(res=>{
        this.notificationService.success("Pago registrado!");
        this.loadingService.hide;
        this.dialogRef.close(res);
      });
    }
  }
  editPayment(){
    this.loadingService.show();
    this.paymentService.edit(this.newPayment).subscribe(res=>{
      this.notificationService.success("Pago actualizado!");
      this.loadingService.hide;
      this.dialogRef.close(res);
    });
  }
}