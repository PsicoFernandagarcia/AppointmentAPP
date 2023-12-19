import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAppointmentComponent } from './day-appointment.component';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import { TranslateModule } from '../_pipes/resource.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
