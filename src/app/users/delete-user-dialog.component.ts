import { ThisReceiver } from "@angular/compiler";
import { Component, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "../_models/payment";
import { User } from "../_models/user";
import { LoadingService } from "../_services/loading.service";
import { NotificationService } from "../_services/notification.service";
import { PaymentService } from "../_services/payments.service";
import { UserService } from "../_services/users.service";

export class DeleteUserData{
  users: Array<User> = [];
  selectedUserToDelete!: User ;
}
@Component({
  selector: 'delete-user',
  templateUrl: 'delete-user-dialog.html',
  styleUrls: ['delete-user-dialog.css']
})
export class DeleteUserDialog {
  selectedUser!: User;
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>
    ,@Inject(MAT_DIALOG_DATA) public data: DeleteUserData
  ) {
   
  }

  onPatientChange(userId: number){
    this.selectedUser = this.data.users.filter(u => u.id === userId)[0];
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick():void{
    this.dialogRef.close(this.selectedUser);
  }

 
}