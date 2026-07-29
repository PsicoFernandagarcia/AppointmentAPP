import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemMessage } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessages(showAll: boolean): Observable<SystemMessage[]> {
    const options = {
      params: new HttpParams().set('ShowAll', showAll.toString())
    };
    return this.http.get<SystemMessage[]>('/Messages', options);
  }

  createMessage(message: Omit<SystemMessage, 'id'>): Observable<SystemMessage> {
    return this.http.post<SystemMessage>('/Messages', message);
  }

  updateMessage(id: number, message: SystemMessage): Observable<SystemMessage> {
    return this.http.put<SystemMessage>(`/Messages`, message);
  }

  deleteMessage(id: number): Observable<unknown> {
    return this.http.delete(`/Messages/${id}`);
  }
}
