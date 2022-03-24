import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAppointmentComponent } from './day-appointment.component';
import {MatChipsModule} from '@angular/material/chips';
import { TranslateModule } from '../_pipes/resource.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DayAppointmentComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[DayAppointmentComponent]
})
export class DayAppointmentModule { }
