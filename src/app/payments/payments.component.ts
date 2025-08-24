import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Payment } from '../_models/payment';
import { User } from '../_models/user';
import { LoadingService } from '../_services/loading.service';
import { PaymentService } from '../_services/payments.service';
import { AddPaymentDialog } from './add-payment-dialog.component';
import { PaymentDebtDialog } from './payment-debt-dialog.component';
import { PaymentReportDialog } from './payment-report-dialog.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Array<Payment> = [];
  paymentsFiltered: Array<Payment> = [];
  isHost: boolean = false;
  hostId: number = 0;
  patients:User[] = [];
  patientSelected:any;
  patientSelectedCombo:number = 0;
  patientSelectedToLoadPayment = 0;
  paymentsFromUserSelected : Array<Payment>=[];
  showOnlyDebt!:boolean;

  constructor(
            private paymentService :PaymentService
            ,private loadingService:LoadingService
            ,public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.isHost = localStorage.getItem('userRole') === "HOST";
    this.hostId = JSON.parse(localStorage.getItem('currentUser') || '').id;

    this.loadPayments();
  }

  loadPayments(){
    this.loadingService.show()
    this.paymentService.getLatestPayments().subscribe(res => {
      this.payments = res;
      this.fillPatients();
      this.onPatientChange(this.patientSelected);
      this.loadingService.hide();
    });
  }

  fillPatients(){
    this.patients = [];
    this.payments.forEach(a =>{
      let p = this.patients.filter( pat => a.patientId === pat.id);
      if(p.length === 0){
        this.patients.push(a.patient);
      }
    });
   
  }

  onPatientChange(p:any){
    this.patientSelected = p;
    this.paymentsFiltered = JSON.parse(JSON.stringify(this.payments));
    if(!p || p === 0 ){
      this.sortPayments();
      return;
    } 
    this.paymentsFiltered = this.paymentsFiltered.filter(pf => pf.patientId === p);
    this.sortPayments();
  }

  sortPayments(){
    this.paymentsFiltered.sort((a,b)=>{
      if(a.paidAt > b.paidAt){
        return -1;
      }
      return 1;
    })
  }

  loadPaymentsFromPatient(payment:Payment){
    if(this.patientSelectedToLoadPayment == payment.patientId) {
      this.patientSelectedToLoadPayment = 0;
      return;
    }
    this.loadingService.show()
    this.patientSelectedToLoadPayment = payment.patientId;
    this.paymentService.getPayments(payment.patientId,0,10).subscribe(payments=>{
      this.paymentsFromUserSelected = payments;
      this.loadingService.hide();
    });
  }

  sp(e:Event){
    e.stopPropagation();
  }

  addPayment(e:Event,payment:Payment,edit:boolean){
    e.stopPropagation();
    const dialogRef = this.dialog.open(AddPaymentDialog, {
      data:{
        payment,
        editPayment:edit
      }
    });

    dialogRef.afterClosed().subscribe(payment => {
      if(!payment || payment.id <=0){
        return;
      }
      this.patientSelectedToLoadPayment = 0;
      this.loadPayments();
    });
  }

  showPaymentInformation(){
    const dialogRef = this.dialog.open(PaymentReportDialog, {
      data:{
        hostId: this.hostId,
        year: (new Date()).getFullYear()
      }
    });
  }

  getIndexDate(index: number,payment:Payment) {
    return new Date(payment.paidAt.toString() ?? '').setDate(index);
  }

  showPaymentsDebt(e:Event,totalDebt:number, patientId:number){
    e.stopPropagation();
    const dialogRef = this.dialog.open(PaymentDebtDialog, {
      data:{
        hostId: this.hostId,
        totalDebt,
        patientId
      }
    });
  }
}
