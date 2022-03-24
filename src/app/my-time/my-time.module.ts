import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTimeComponent } from './my-time.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { TranslateModule } from '../_pipes/resource.module';
import { MyTimeRoutingModule } from './my-time-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
