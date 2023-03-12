

export class CalendarEvent {
  description!: string;
  date!: Date;
  color!: number;

  constructor(_description: string,_date: Date, _color: number) {
      this.description = _description;
      this.date =_date;
      this.color = _color;
  }

}


