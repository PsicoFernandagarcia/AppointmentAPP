import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Availability } from '../_models/availability';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http: HttpClient) { }


  getAvailabilities(hostId:number,dateFrom :Date,dateTo :Date, showOnlyAvailables: boolean):Observable<Availability[]>{
    const options =   {
      params: new HttpParams().set('hostId',hostId)
                              .set('dateFrom',dateFrom.toDateString())
                              .set('dateTo',dateTo.toDateString())
                              .set('showOnlyAvailable',showOnlyAvailables)
    };
    return this.http.get<Availability[]>('/availabilities',options).pipe(
      map( response => {
        response.forEach(a => {
          a.dateOfAvailability = new Date(a.dateOfAvailability)
        })
        return response;
      })
    );
  }

  myAvailabilities(dateFrom :Date,dateTo :Date):Observable<Availability[]>{
    const options =   {
      params: new HttpParams().set('dateFrom',dateFrom.toUTCString())
                              .set('dateTo',dateTo.toUTCString())
    };
    return this.http.get<Availability[]>('/availabilities/mine',options).pipe(
      map( response => {
        response.forEach(a => {
          a.dateOfAvailability = new Date(a.dateOfAvailability)
        })
        return response;
      })
    );
  }

  setAvailabilities(availabilities:Availability[], availabilitiesToRemove:number[]):Observable<Availability[]>{
    return this.http.post<Availability[]>('/availabilities/bulk',{
      'Availabilities':availabilities,
      'AvailabilitiesToRemove':availabilitiesToRemove
    });
  }
}
