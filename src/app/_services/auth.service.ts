import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, AuthExternal, AuthResponse } from '../_models/auth';
import { NewUser } from '../_models/user-new';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth(authModel :Auth):Observable<AuthResponse>{
    return this.http.post<AuthResponse>('/auth',authModel);
  }

  authExternal(authModel :AuthExternal):Observable<AuthResponse>{
    return this.http.post<AuthResponse>('/auth/External',authModel);
  }

  createUser(newUserModel :NewUser):Observable<User>{
    return this.http.post<User>('/users',newUserModel);
  }

  sendPasswordCode(email: string): Observable<void>{
    return this.http.post<void>('/auth/ResetPasswordCode',{email});
  }
  
  resetPassword(email: string, code: string, newPassword: string): Observable<void>{
    return this.http.put<void>('/auth/Password',{email, code, newPassword});
  }
}
