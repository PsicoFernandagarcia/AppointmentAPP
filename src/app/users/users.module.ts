import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../_pipes/resource.module';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { UserFilterModule } from '../user-filter/user-filter.module';
import { UsersComponent } from './users.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';
import { DeleteUserDialog } from './delete-user-dialog.component';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';



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
