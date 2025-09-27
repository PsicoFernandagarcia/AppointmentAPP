import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [
    './courses.component.css'
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
export class CoursesComponent {
  selected: number = 4;
  today = new Date();
  courses = [
    {
      title: "Manejo psicológico del miedo",
      description:'¡Un taller que no sabias que necesitabas! Estrategias de afrontamiento para desafios técnicos en el mundo del pole', 
      duration:"2 horas",
      date: "1 de Noviembre de 2025",
      endDate: new Date(2025, 10, 2),
      image: "../../assets/images/course_1_manejo_miedo.webp",
      alt:"Manejo psicológico del miedo",
      moreInfoUrl: "https://drive.google.com/file/d/12p8ZvR9cS_CoGts9abTpEpcbo1ZRw_f1/view?usp=drive_link ",
      enrollUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeNJzKxx54iET8YNVXaYzbBNgCC8HzkuELwJlSYmxXjg-0c3w/viewform?usp=sharing&ouid=100457710135527424346"
    }
  ]    
}
