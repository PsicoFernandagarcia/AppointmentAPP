import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { DayAppointmentModule } from '../day-appointment/day-appointment.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    DayAppointmentModule
  ],
  exports:[AgendaComponent]
})
export class AgendaModule { }
