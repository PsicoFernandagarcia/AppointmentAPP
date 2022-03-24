export class Appointment{
  id:number
  title: string;
  dateFrom: Date;
  dateTo: Date;
  with: string;
  createdById:number;
  createdBy: string;
  hostId:number;
  hostName:string;
  patientId:number;
  patientName:string;
  color:string;
  isDeleted:boolean;
  status:string;
  updatedAt:Date;

  constructor(_id:number,_title:string,_dateFrom:Date,_dateTo:Date,_with:string,
    _createdById:number,
  _createdBy: string,
  _hostId:number,
  _hostName:string,
  _patientId:number,
  _patientName:string,
  _color:string,
  _isDeleted:boolean,
  _status:string,
  _updatedAt:Date,
    ) {
   this.id=_id;
   this.title=_title;
   this.dateFrom=_dateFrom;
   this.dateTo=_dateTo;
   this.with=_with;
   this.createdById=_createdById;
   this.createdBy=_createdBy;
   this.hostName=_hostName;
   this.hostId=_hostId;
   this.patientId=_patientId;
   this.patientName=_patientName;
   this.color=_color;
   this.isDeleted=_isDeleted;
   this.status=_status;
   this.updatedAt=_updatedAt;

  }
}


export class HostAppointment{
  title: string;
  dateFrom: Date;
  dateTo: Date;
  patientEmail: string;
  timezoneOffset:number;
  hostId:number;
  availabilityId:number;
  patientId:number;
  patientName:string;
  color:string;
  isDeleted:boolean;
  status:string;
  updatedAt:Date;

  constructor(_title:string,_dateFrom:Date,_dateTo:Date,_patientEmail:string,
    _timezoneOffset:number,
  _hostId:number,
  _patientId:number,
  _patientName:string,
  _color:string,
  _isDeleted:boolean,
  _status:string,
  _updatedAt:Date,
  _availabilityId:number
    ) {
   this.title=_title;
   this.dateFrom=_dateFrom;
   this.dateTo=_dateTo;
   this.patientEmail=_patientEmail;
   this.timezoneOffset=_timezoneOffset;
   this.hostId=_hostId;
   this.patientId=_patientId;
   this.patientName=_patientName;
   this.color=_color;
   this.isDeleted=_isDeleted;
   this.status=_status;
   this.updatedAt=_updatedAt;
  this.availabilityId = _availabilityId;
  }
}
