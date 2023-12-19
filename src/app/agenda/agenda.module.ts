import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import { DayAppointmentModule } from '../day-appointment/day-appointment.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslateModule } from '../_pipes/resource.module';


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
    DayAppointmentModule,
    TranslateModule
  ],
  exports:[AgendaComponent]
})
export class AgendaModule { }
