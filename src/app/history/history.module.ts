import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslateModule } from '../_pipes/resource.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
