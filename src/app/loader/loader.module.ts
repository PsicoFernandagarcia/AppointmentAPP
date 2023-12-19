import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderRoutingModule } from './loader-routing.module';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    LoaderRoutingModule,
    MatProgressSpinnerModule
  ],
  exports:[LoaderComponent]
})
export class LoaderModule { }
