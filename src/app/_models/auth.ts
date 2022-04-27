
export class Auth{
    userName: string;
    password: string;
    timezoneOffset:number;
    /**
     *
     */
    constructor(_userName:string,_password:string, _timezoneOffset:number) {
        this.userName = _userName;
        this.password = _password;
        this.timezoneOffset = _timezoneOffset
    }
}

export class AuthExternal{
  email: string;
  firstName: string;
  lastName: string;
  idToken: string;
  provider: string;
  timezoneOffset:number;
  constructor(_email:string,_firstName:string,_lastName:string,_idToken:string,_provider:string, _timezoneOffset: number) {
    this.email=_email;
    this.firstName=_firstName;
    this.lastName=_lastName;
    this.idToken=_idToken;
    this.provider=_provider;
    this.timezoneOffset = _timezoneOffset;
  }
}

export class AuthResponse{
    token: string;
    userName:string;
    email: string;
    /**
     *
     */
    constructor(token:string,_email:string,_userName:string) {
        this.token = token;
        this.email=_email;
        this.userName=_userName;
    }
}


