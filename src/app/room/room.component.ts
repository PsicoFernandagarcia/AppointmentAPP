import {  AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { environment } from 'src/environments/environment';
import { VideoComponent } from '../videocall/video/video.component';
import { NotificationService } from '../_services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

class ChannelParameters {
  localAudioTrack!: IMicrophoneAudioTrack;
  // A variable to hold a local video track.
  localVideoTrack!: ICameraVideoTrack;
  // A variable to hold a remote audio track.
  remoteAudioTrack: any;
  // A variable to hold a remote video track.
  remoteVideoTrack: any;
  // A variable to hold the remote user id.s
  remoteUid!: string;

  screenTrack!:any;
}

class RemoteUserInformation{
  id:string = '';
  name:string='';
  lastName:string='';
  email:string='';
}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit,AfterViewInit {
  
  @ViewChildren(VideoComponent)
  private videoComponentsQueryList!:  QueryList<VideoComponent>;
  private videoComponents!:  Array<VideoComponent>;

  agoraEngine!: IAgoraRTCClient;
  callReady:boolean=false;
  remoteUser: IAgoraRTCRemoteUser | undefined;
  remoteUserInformation: RemoteUserInformation = new RemoteUserInformation();
  userVideoSelected: string = '';
  currentUser:any = {};
  sharingScreen:boolean = false;
  isDragging = false;
  localAudioEnabled = true;
  localCameraEnabled = false;

  config = {
    appid: environment.video_appid,
    channelName: '',
    token: null,
    uid: '',
  };
  channelParameters = new ChannelParameters();

  constructor(
    private changeDetector : ChangeDetectorRef,
    private router: Router,
    private route:ActivatedRoute,
    private notificationService: NotificationService
    ) { }
  
  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") ?? '{}');
    this.route.queryParamMap
        .subscribe(async (p:any) => {
          const currentUserRole = localStorage.getItem("userRole") ?? '';
          const patientId = p['params'].patientId;
          if(patientId == this.currentUser.id || currentUserRole == 'HOST'){
            this.config.channelName = `room-patient-${patientId}`;
            this.userVideoSelected = this.currentUser.id;
            this.config.uid = this.currentUser.id;
            await this.setupAgoraEngine();
            await this.join();
          }else {
            this.notificationService.error("Lamentablemente no tienes permitido acceder a la llamada, comunícate con la profesional");
            this.router.navigate(["main/dashboard"]);
          }
      }
    );
   
  }

  ngAfterViewInit(): void {
    this.videoComponents = this.videoComponentsQueryList.toArray();
  }

  async setupAgoraEngine() {
    this.agoraEngine = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9' });

    this.agoraEngine.on('user-published', async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await this.agoraEngine.subscribe(user, mediaType);
      console.log('subscribe success');
      await this.handleUserPublished(user, mediaType);
    });

    // Listen for the "user-unpublished" event.
    this.agoraEngine.on('user-unpublished', async (user,mediaType) => {
      await this.handleUserUnPublished(user,mediaType);
    });

    this.agoraEngine.on('user-left', async () => {
      this.remoteUser = undefined;
      this.notificationService.success(`${this.remoteUserInformation.name} ha dejado la llamada`)
      this.remoteUserInformation = new RemoteUserInformation();
    });
  }

  async join() {
    await this.agoraEngine.join(
      this.config.appid,
      this.config.channelName,
      this.config.token,
      `${this.currentUser.id}*${this.currentUser.name}*${this.currentUser.lastName}*${this.currentUser.email}`
    );
    // Create a local audio track from the audio sampled by a microphone.
    const audioAndVideo = await AgoraRTC.createMicrophoneAndCameraTracks();
    this.channelParameters.localAudioTrack = audioAndVideo[0];
    // Create a local video track from the video captured by a camera.
    this.channelParameters.localVideoTrack = audioAndVideo[1];
    this.channelParameters.localVideoTrack.setEnabled(this.localCameraEnabled);
    // Append the local video container to the page body.
    let player = this.videoComponents[0].getVideoContainer();
    this.videoComponents[0].setCameraValue(this.localCameraEnabled);
    // Publish the local audio and video tracks in the channel.
    await this.agoraEngine.publish([
      this.channelParameters.localAudioTrack,
      this.channelParameters.localVideoTrack,
    ]);
    // Play the local video track.
    this.channelParameters.localVideoTrack.play(player);
    this.callReady = true;
    
  }

  async leave() {
    // Destroy the local audio and video tracks.
    this.channelParameters.localAudioTrack.close();
    this.channelParameters.localVideoTrack.close();
    // Remove the containers you created for the local video and remote video.
    await this.agoraEngine.leave();
    this.router.navigate(["main/dashboard"]);
  }

  async handleUserPublished(user: IAgoraRTCRemoteUser, mediaType: string) {
    if(!this.remoteUser){
      this.remoteUser = user;
      this.setRemoteUserInformation(user.uid.toString());
      await this.changeDetector.detectChanges();
      this.videoComponents = this.videoComponentsQueryList.toArray();
    }
    

    if (mediaType === 'video') {
      let player = this.videoComponents[1].getVideoContainer();
      this.videoComponents[1].setCameraValue(true);
      user.videoTrack!.play(player);
    }

    if (mediaType === 'audio') {
      this.videoComponents[1].setMicValue(true);
      user.audioTrack!.play();
    }
  }

  async handleUserUnPublished(user: IAgoraRTCRemoteUser, mediaType:string) {
      this.remoteUser = user;
      switch(mediaType){
        case 'video':{
          this.videoComponents[1].setCameraValue(false);
          break;
        }
        case 'audio':{
          this.videoComponents[1].setMicValue(false);
        }
      }
     
  }



  async toggleCamera() {
    
    this.localCameraEnabled = !this.localCameraEnabled;
    this.videoComponents[0].switchCamera();
    await this.channelParameters.localVideoTrack.setEnabled(this.localCameraEnabled);
  }

  async toggleMic() {
    this.localAudioEnabled = !this.localAudioEnabled;
    this.videoComponents[0].switchMic();
    await this.channelParameters.localAudioTrack.setEnabled(this.localAudioEnabled);

  }

  async toggleScreen(){
    let player = this.videoComponents[0].getVideoContainer();
    
    if(!this.sharingScreen){
        this.sharingScreen = true;
        this.channelParameters.screenTrack =  await AgoraRTC.createScreenVideoTrack({ });
        this.channelParameters.screenTrack.on('track-ended', () => {
          this.toggleScreen();
        });

        await this.agoraEngine
          .unpublish([this.channelParameters.localVideoTrack]);

        this.channelParameters.localVideoTrack.close();
        // Replace the video track with the screen track.
        await this.agoraEngine
          .publish(this.channelParameters.screenTrack);
        // Play the screen track.
        this.channelParameters.screenTrack.play(player);

    }else{
      this.sharingScreen = false;
      await this.agoraEngine
        .unpublish([this.channelParameters.screenTrack]);
      this.channelParameters.screenTrack.close();
      
      this.channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      
      await this.agoraEngine
        .publish([this.channelParameters.localVideoTrack]);
      // Play the video track.
      this.channelParameters.localVideoTrack.play(player);
    }
}

  setMainVideo(videoId : string){
    if(this.userVideoSelected === videoId || this.isDragging)
    return;
    this.userVideoSelected = videoId;
  }

  setRemoteUserInformation(value:string){
    const information = value.split('*');
    this.remoteUserInformation.id = information[0];
    this.remoteUserInformation.name = information[1]; 
    this.remoteUserInformation.lastName = information[2]; 
    this.remoteUserInformation.email = information[3]; 

  }


  setDrag(isDragging:boolean){
    if(this.isDragging){
      setTimeout(() => {
        this.isDragging = isDragging;
      }, 1000);
    }else{

      this.isDragging = isDragging;
    }
    console.log(this.isDragging + "  asi estamos")
  }
}
