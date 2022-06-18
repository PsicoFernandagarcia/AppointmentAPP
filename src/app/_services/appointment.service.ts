import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment, HostAppointment } from '../_models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  myAppointments(dateFrom :Date):Observable<Appointment[]>{
    const options =   {
      params: new HttpParams().set('dateFrom',dateFrom.toUTCString())
    };
    return this.http.get<Appointment[]>('/appointments/mine',options).pipe(
      map( response => {
        response.forEach(a => {
          a.dateFrom = new Date(a.dateFrom),
          a.dateTo = new Date(a.dateTo)
        })
        return response;
      })
    );;
  }

  get(year:number):Observable<Appointment[]>{
    const options =   {
      params: new HttpParams().set('year',year)
    };
    return this.http.get<Appointment[]>('/appointments',options).pipe(
      map( response => {
        response.forEach(a => {
          a.dateFrom = new Date(a.dateFrom),
          a.dateTo = new Date(a.dateTo)
        })
        return response;
      })
    );;
  }

  save(appointment:Appointment,availabilityId:number):Observable<Appointment>{
    return this.http.post<Appointment>('/appointments',{
      title: appointment.title,
      dateFrom: appointment.dateFrom.toUTCString(),
      dateTo:appointment.dateTo.toUTCString(),
      with: appointment.with,
      createdById: appointment.createdById,
      hostId:appointment.hostId,
      patientId:appointment.patientId,
      color:appointment.color,
      availabilityId
    })
  }

  saveHostAssignment(appointment:HostAppointment):Observable<Appointment>{
    return this.http.post<Appointment>('/appointments/HostAssignments',appointment)
  }

  cancelAppointment(appointmentId:number, userId:number):Observable<boolean>{
    return this.http.post<boolean>(`/appointments/${appointmentId}/Cancel`,{userId:userId})
  }
}
