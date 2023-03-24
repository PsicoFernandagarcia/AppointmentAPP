import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import jwt_decode from 'jwt-decode';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Appointment-App';
  showToolbar: boolean=false;
  role:string='';
  public static logout = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
    ,private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.showToolbar = (token && this.isTokenValid(token.split(' ')[1])) || false;
    if(!this.showToolbar)
    {
      this.router.navigate(['main/login']);
    }
    this.role = localStorage.getItem('userRole')??'';
    this.suscribeLogin();
  }

  logout(){
    localStorage.clear();
    this.showToolbar=false;
    MainComponent.logout.next(true);

    this.router.navigate(['home']);
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

  openBottomMenu(){
    var ref = this._bottomSheet.open(BottomMenuComponent,{
      data:{role:this.role}
    });
    ref.afterDismissed().subscribe(res => {
      if(res === 'logout') this.logout();
    })
  }
}
