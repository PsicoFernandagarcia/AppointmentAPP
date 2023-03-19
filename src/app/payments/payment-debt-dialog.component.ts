import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../_models/appointment';
import { Payment } from '../_models/payment';
import { AppointmentService } from '../_services/appointment.service';
import { LoadingService } from '../_services/loading.service';
import { PaymentService } from '../_services/payments.service';

export class PaymentDebtInput {
  hostId!: number;
  patientId!: number;
  totalDebt!: number;
}
@Component({
  selector: 'payment-debt',
  templateUrl: 'payment-debt-dialog.html',
  styleUrls: ['./payment-debt-dialog.css']
})
export class PaymentDebtDialog {
  appointments: Appointment[] = [];
  
  constructor(
    private appointmentService: AppointmentService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<PaymentDebtDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDebtInput
  ) {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loadingService.show();
    this.appointmentService
      .getLast( this.data.hostId, this.data.patientId, this.data.totalDebt)
      .subscribe((app) => {
        this.appointments = app;
        this.loadingService.hide();
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.appointments = [];
  }

}
