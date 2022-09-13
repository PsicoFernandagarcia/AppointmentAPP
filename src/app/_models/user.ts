

export class User {
  id: number;
  userName: string;
  name!: string;
  lastName!: string;
  email: string;
  password!: string;

  constructor(_id: number,_userName: string, _email: string) {
      this.userName = _userName;
      this.id =_id;
      this.email = _email;
  }

}


