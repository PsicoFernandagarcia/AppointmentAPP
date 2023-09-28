

export class Availability {
  id:number;
  hostId:number;
  dateOfAvailability:Date;
  amountOfTime:number;
  isEmpty: boolean;
  appointmentId: number;
  appointmentWith: string;

  constructor(_id: number,_hostId: number, _dateOfAvailability: Date, _amountOfTime:number
    ,_isEmpty:boolean, _appointmentId: number, _appointmentWith: string) {
      this.id =_id;
      this.hostId=_hostId;
      this.dateOfAvailability=_dateOfAvailability;
      this.amountOfTime=_amountOfTime;
      this.isEmpty=_isEmpty;
      this.appointmentId = _appointmentId,
      this.appointmentWith = _appointmentWith
  }
}


