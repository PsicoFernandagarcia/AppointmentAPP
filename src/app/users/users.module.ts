import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../_pipes/resource.module';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserFilterModule } from '../user-filter/user-filter.module';
import { UsersComponent } from './users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DeleteUserDialog } from './delete-user-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    UsersComponent,
    DeleteUserDialog
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    TranslateModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    UserFilterModule,
    MatCardModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class UsersModule { }
