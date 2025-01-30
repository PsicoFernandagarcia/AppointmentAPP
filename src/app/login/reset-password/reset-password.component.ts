import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Encrypt } from 'src/app/_services/crypt';
import { LoadingService } from 'src/app/_services/loading.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  formGroup!: FormGroup;
  codeSent = false;

   constructor(
      public authService: AuthService
      ,private notificationService: NotificationService
      ,private loaderService:LoadingService
    ) {
     }
  
  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
          email: new UntypedFormControl('', [
            Validators.required,
            Validators.email
          ]),
          code: new UntypedFormControl('', [
            Validators.required,
          ]),
          password: new UntypedFormControl('', [
            Validators.required,
          ])
        });
  }

  sendCode(){
    this.loaderService.show();
    this.authService.sendPasswordCode(this.formGroup.get("email")?.value).subscribe(_ => {
      this.codeSent = true;
      this.loaderService.hide();
    });
  }

  resetPass(){
    this.loaderService.show();
    const password = Encrypt.encrypt(this.formGroup.get('password')?.value);
    this.authService.resetPassword(this.formGroup.get("email")?.value,this.formGroup.get("code")?.value, password).subscribe(res => {
      this.loaderService.hide();
      this.notificationService.success("Password actualizada");
    })
  }

}
