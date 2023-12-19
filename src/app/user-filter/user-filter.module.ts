import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFilterComponent } from './user-filter.component';
import { UserFilterRoutingModule } from './user-filter-routing.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UserFilterComponent
  ],
  imports: [
    UserFilterRoutingModule,
    CommonModule,
    MatSelectModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    FormsModule
  ],
  exports:[UserFilterComponent]
})
export class UserFilterModule { }
