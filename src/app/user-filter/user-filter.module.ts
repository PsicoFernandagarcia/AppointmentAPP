import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFilterComponent } from './user-filter.component';
import { UserFilterRoutingModule } from './user-filter-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
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
