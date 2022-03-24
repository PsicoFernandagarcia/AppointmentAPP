

export class Availability {
  id:number;
  hostId:number;
  dateOfAvailability:Date;
  amountOfTime:number;
  isEmpty: boolean;

  constructor(_id: number,_hostId: number, _dateOfAvailability: Date, _amountOfTime:number,_isEmpty:boolean) {
      this.id =_id;
      this.hostId=_hostId;
      this.dateOfAvailability=_dateOfAvailability;
      this.amountOfTime=_amountOfTime;
      this.isEmpty=_isEmpty;
  }
}


