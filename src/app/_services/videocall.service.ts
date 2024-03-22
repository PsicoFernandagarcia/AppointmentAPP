import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment, HostAppointment } from '../_models/appointment';

class VideoCallInformation{
  token:string = '';
  appId: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  constructor(private http: HttpClient) { }

  GetVideoCallInformation(channel :string, uid:string):Observable<VideoCallInformation>{
    const options =   {
      params: new HttpParams().set('tokenType','rtc')
                              .set('channel',channel)
                              .set('uid',uid)
    };
    return this.http.get<VideoCallInformation>('/videocall',options);
  }
}
