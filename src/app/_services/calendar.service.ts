import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CalendarEvent } from '../_models/calendarEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvents(eventsFromDate: Date):Observable<CalendarEvent[]>{
    const options =   {
      params: new HttpParams().set('eventsFromDate',eventsFromDate.toDateString())
    };
    return this.http.get<CalendarEvent[]>('/calendars/events',options).pipe(
      map( response => {
        response.forEach(a => {
          a.date = new Date(a.date)
        })
        return response;
      })
    );;
  }
}
