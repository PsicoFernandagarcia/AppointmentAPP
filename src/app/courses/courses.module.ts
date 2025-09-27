import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingmodule } from './courses-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { A11yModule } from "@angular/cdk/a11y";
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingmodule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    A11yModule,
    MatCardModule,
    MatChipsModule
],
})
export class CoursesModule {}
