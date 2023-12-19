import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTimeComponent } from './my-time.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import { TranslateModule } from '../_pipes/resource.module';
import { MyTimeRoutingModule } from './my-time-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';

@NgModule({
  declarations: [
    MyTimeComponent
  ],
  imports: [
    CommonModule,
    MyTimeRoutingModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule,
    MatExpansionModule,
    MatCheckboxModule
  ]
})
export class MyTimeModule { }
