import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {   IAgoraRTCClient } from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {

  @ViewChild("video") video!: ElementRef;
  @Input() userId!:string;
  @Input() small!:boolean;
  @Input() cameraOn : boolean = false;
  @Input() micOn : boolean = false;
  @Input() userName : string = '';
  cameraOffName:string = '';


  ngOnInit(): void {
    this.initCameraOffName();
  }

  getVideoContainer(){
    return `video-container-${this.userId}`;
  }

  switchCamera(){
    this.setCameraValue(!this.cameraOn);
  }

  setCameraValue( value: boolean){
    this.cameraOn = value;
  }

  switchMic(){
    this.setMicValue(!this.micOn);
  }

  setMicValue( value: boolean){
    this.micOn = value;
  }

  initCameraOffName() {
    const names = this.userName.split(' ');
    names.forEach(name => {
      this.cameraOffName+= name[0];
    });
  }

}
 

