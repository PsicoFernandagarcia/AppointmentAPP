import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Appointment-App';
  showToolbar: boolean=false;
  role:string='';
  constructor(
    private router: Router
  ) {

  }
  ngOnInit(): void {
    // const token = localStorage.getItem("token");
    // this.showToolbar = (token && this.isTokenValid(token.split(' ')[1])) || false;
    // if(!this.showToolbar)
    // {
    //   this.router.navigate(['login']);
    // }
    // this.role = localStorage.getItem('userRole')??'';
    this.suscribeLogin();
  }


  logout(){
    localStorage.clear();
    this.showToolbar=false;
    this.router.navigate(['main/login']);
  }

  suscribeLogin(){
    LoginComponent.logginSuccess.subscribe(value => {
        if(value.userName !== ''){
          this.showToolbar = true;
          this.role = localStorage.getItem('userRole')??'';
        }
    });
  }
  isTokenValid(token:string):boolean{
    let info  = jwt_decode(token) as any;
    const exp = info.exp;
    return Date.now() < exp * 1000;
  }
}
