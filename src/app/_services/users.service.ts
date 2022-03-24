import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthExternal, AuthResponse } from '../_models/auth';
import { NewUser } from '../_models/user-new';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getHosts():Observable<User[]>{
    return this.http.get<User[]>('/users/hosts');
  }
  getPatients():Observable<User[]>{
    return this.http.get<User[]>('/users/patients');
  }
}
