import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "../_models/payment";
import { User } from "../_models/user";
import { LoadingService } from "../_services/loading.service";
import { NotificationService } from "../_services/notification.service";
import { PaymentService } from "../_services/payments.service";

@Component({
  selector: 'add-payment',
  templateUrl: 'add-payment-dialog.html',
})
export class AddPaymentDialog {
  newPayment:Payment = new Payment();

  constructor(
    private paymentService:PaymentService
    ,private notificationService:NotificationService
    ,private loadingService : LoadingService
    ,public dialogRef: MatDialogRef<AddPaymentDialog>
    ,@Inject(MAT_DIALOG_DATA) public previousPayment: Payment
  ) {
    this.newPayment = JSON.parse(JSON.stringify(previousPayment));
    this.newPayment.currency = !this.newPayment.currency ? "EUR" : this.newPayment.currency;
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.newPayment = new Payment();
  }

  savePayment(){
    if(this.newPayment.sessionsPaid <= 0
        || !this.newPayment.currency 
      ){
        this.notificationService.alert("Debe completar todos los datos");
        return;
    }
    this.loadingService.show();
    this.paymentService.save(this.newPayment).subscribe(res=>{
      this.notificationService.success("Pago registrado!");
      this.loadingService.hide;
      this.dialogRef.close(res);
    });

  }
}