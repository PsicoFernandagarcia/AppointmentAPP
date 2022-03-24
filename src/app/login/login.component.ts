import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Auth, AuthExternal, AuthResponse } from '../_models/auth';
import { User } from '../_models/user';
import { NewUser } from '../_models/user-new';
import { AppSettingsService } from '../_services/app-settings.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { LoadingService } from '../_services/loading.service';
const unsplash = createApi({ accessKey: 'HrgmLTUUM2pk2xwmYDoAxgn4dh1L7SZdF_3o4fjf-os' });

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  formGroupRegister!: FormGroup;
  socialUser!: SocialUser;
  showRegister: boolean = false;
  urlImage:string='';
  public static logginSuccess = new BehaviorSubject<AuthResponse>(new AuthResponse('','',''));
  constructor(
    public authService: AuthService
    ,private router: Router
    ,private formBuilder: FormBuilder
    ,private socialAuthService: SocialAuthService
    ,private notificationService: NotificationService
    ,private appsettingsService: AppSettingsService
    ,private loaderService:LoadingService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
    this.formGroupRegister = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });

    unsplash.photos.getRandom(
      { 
        query:"training,brain"
       },
      { headers: { 'X-Custom-Header-2': 'bar' } },
    ).then(res=>{
       const r = <Random>res.response;
       this.urlImage = r.urls.full ;
    });
  }


  login(){
    this.loaderService.show();

    this.authService.getTimeZone().subscribe(res=>{
      console.log(res);
    });
    if(!this.formGroup.valid) return;
    this.authService.auth(this.formGroup.value).subscribe(data=>{
      this.onLoginSuccess(data);
      this.loaderService.hide();
    },error =>{
      this.notificationService.error("Usuario o contraseña incorrecto");
    });
  }

  register(){
    if(!this.formGroupRegister.valid) return;
    const newUser = this.formGroupRegister.value as NewUser;
    newUser.email = newUser.userName;
    newUser.timezoneOffset = (new Date().getTimezoneOffset()*-1);
    this.authService.createUser(newUser).subscribe(data=>{
      this.notificationService.success("Usuario creado correctamente");
      this.showRegistrationForm();
    },error =>{
      this.notificationService.error("Error al registrar el usuario");
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
      const timezoneOffset = new Date().getTimezoneOffset();
      this.authService.authExternal(new AuthExternal(data.email,data.firstName,data.lastName,data.idToken,data.provider,timezoneOffset))
      .subscribe(res=>{
        this.onLoginSuccess(res);
      })
    }).catch(err=>{
      console.log("error");
      console.log(err);
    });
  }

  onLoginSuccess(data:AuthResponse){
    let info  = jwt_decode(data.token) as any;
    localStorage.setItem('currentUser',JSON.stringify(data));
    localStorage.setItem('userName',this.formGroup.get('userName')?.value);
    localStorage.setItem('userRole',info.role);
    localStorage.setItem('token','Bearer '+ data.token);
     //LoginComponent.logginSuccess.next(new UserModel(0,this.loginModel.userName,info.role));
     LoginComponent.logginSuccess.next(data);
    this.router.navigate(['dashboard']);
  }

  showRegistrationForm(){
    this.showRegister = !this.showRegister;
  }

}
