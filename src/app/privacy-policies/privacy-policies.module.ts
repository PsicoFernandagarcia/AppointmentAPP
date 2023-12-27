import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPoliciesComponent } from './privacy-policies.component';
import { PrivacyPoliciesRoutingModule } from './privacy-policies-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrivacyPoliciesComponent
  ],
  imports: [
    CommonModule,
    PrivacyPoliciesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule
  ]
})
export class PrivacyPoliciesModule { }
