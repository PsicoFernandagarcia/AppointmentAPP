import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { UserFilterModule } from '../user-filter/user-filter.module';
import { TranslateModule } from '../_pipes/resource.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    PaymentsComponent
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
    MatDatepickerModule
  ]
})
export class PaymentsModule { }
