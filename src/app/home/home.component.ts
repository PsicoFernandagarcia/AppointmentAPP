import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
    , '../../assets/css/bootstrap.min4.3.1.css'
    , '../../assets/css/animation.css'
    , '../../assets/css/color-panel.css'
    , '../../assets/css/owl.carousel.css'
    , '../../assets/css/owl.theme.css'
    , '../../assets/css/style.css'
    , '../../assets/css/swiper.min.css'
    , '../../assets/css/responsive.css'
    , '../../assets/css/yellow.css'
  ]
})
export class HomeComponent implements OnInit {
  selected: number = 1;
  emailString: string = '';
  name: string = '';
  email: string = '';
  body: string = '';
  allowHref = false;
  constructor() { }

  ngOnInit(): void {
  }

  getEmailString() {
    return `mailto:psico.fernandagarcia@gmail.com?Subject=Consulta&body=${this.body}`;
  }

}
