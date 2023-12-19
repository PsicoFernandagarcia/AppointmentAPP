import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { FormsModule } from '@angular/forms';
import { UserFilterModule } from '../user-filter/user-filter.module';
import { TranslateModule } from '../_pipes/resource.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaymentReportDialog } from './payment-report-dialog.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import { PaymentDebtDialog } from './payment-debt-dialog.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentReportDialog,
    PaymentDebtDialog
  ],
  imports: [
    PaymentsRoutingModule,
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    UserFilterModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class PaymentsModule { }
