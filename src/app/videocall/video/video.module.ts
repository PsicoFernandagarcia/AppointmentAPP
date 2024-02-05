import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import { VideoRoutingModule } from './video-routing.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    MatIconModule
  ],
  exports:[VideoComponent]
})
export class VideoModule { }
