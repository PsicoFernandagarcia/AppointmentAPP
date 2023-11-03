import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import jwt_decode from 'jwt-decode';
import 'src/app/_pipes/prototypes';

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
    this.suscribeLogin();
    let cc = window as any;
       cc.cookieconsent?.initialise({
         palette: {
           popup: {
             background: "#002D54"
           },
           button: {
             background: "#FF533D",
             text: "#FFFFFF"
           }
         },
         theme: "classic",
         content: {
           message: "Esta página utiliza cookies para mejorar su experiencia de navegación. Para más información visita nuestra",
           dismiss: "OK",
           link: "Politica de privacidad",
           href: "https://psicofernandagarcia.com/privacy-policies" 
         }
       });
  }


  logout(){
    localStorage.clear();
    this.showToolbar=false;
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
}
