import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedDay: Date | null = new Date();
  currentYear:number = new Date().getFullYear();
  minDate: Date;
  maxDate: Date;
  appointments: Date[] = [];
  constructor(private dateAdapter: DateAdapter<any>) {
    dateAdapter.setLocale('es');
    this.appointments.push(new Date(2021,11,30));
    this.appointments.push(new Date(2021,10,30));
    this.minDate = new Date(this.currentYear - 1, 0, 1);
    this.maxDate = new Date(this.currentYear , 11, 31);
    console.log(this.minDate);
    console.log(this.maxDate);

   }

  ngOnInit(): void {
  }
  shouldDrawerBeOppened():boolean{
    return window.innerWidth > 600;
  }

  removeDates = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  setAppointments: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      const date = cellDate;

      const hasAppointment = this.appointments.filter(x => x.getFullYear() === date.getFullYear() && x.getMonth() === date.getMonth() && x.getDate() === date.getDate());
      // Highlight the 1st and 20th day of each month.
      return hasAppointment.length > 0 ? 'custom-date-class' : '';
  };

  getUtc(): string{
    return this.selectedDay?.toUTCString() || '';
  }

}
