import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { VideoModule } from '../videocall/video/video.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    VideoModule,
    DragDropModule,
    MatIconModule
  ]
})
export class RoomModule { }
