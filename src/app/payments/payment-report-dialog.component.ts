import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentInformation } from '../_models/payment';
import { LoadingService } from '../_services/loading.service';
import { NotificationService } from '../_services/notification.service';
import { PaymentService } from '../_services/payments.service';

export class PaymentReportInput {
  hostId!: number;
  year!: number;
}
@Component({
  selector: 'payment-report',
  templateUrl: 'payment-report-dialog.html',
  styleUrls: ['./payments-report-dialog.css']
})
export class PaymentReportDialog {
  payments: PaymentInformation[] = [];
  information: Array<any>=[];
  date: any;
  yearShown: number = 0;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<PaymentReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentReportInput
  ) {
    this.yearShown = this.data.year;
    this.loadPayments();
  }

  loadPayments() {
    this.loadingService.show();
    this.paymentService
      .getPaymentInformation(this.yearShown, this.data.hostId)
      .subscribe((pi) => {
        this.payments = pi;
        this.populateInformation();
        this.loadingService.hide();
      });
  }

  changeYear(year: number) {
    this.yearShown = year;
    this.loadPayments();
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.payments = [];
  }

  populateInformation() {
    this.information  =[];
    const months = [...new Set(this.payments.map((p) => p.month))];
    months.forEach((m) => {
      const paymentsArray = this.payments.filter((p) => p.month === m && p.total > 0);
      let totalAmountEur = 0;
      let totalAmountUSD = 0;
      let totalAmountPeso = 0;

      paymentsArray.filter(p=> p.total >0).forEach((p) => {
        switch (p.currency) {
          case 'EUR':
            totalAmountEur += p.total;
            break;
          case 'USD':
            totalAmountUSD += p.total;
            break;
          case '$':
            totalAmountPeso += p.total;
            break;
        }
      });
      this.information.push({
        month: this.monthNames[m - 1],
        totalAmountEur,
        totalAmountPeso,
        totalAmountUSD,
        paymentsArray
      });
    });
  }
}
