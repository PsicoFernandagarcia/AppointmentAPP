import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '../_pipes/resource.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { UserFilterModule } from '../user-filter/user-filter.module';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    UserFilterModule,
    MatDividerModule
  ]
})
export class HistoryModule { }
