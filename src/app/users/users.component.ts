import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/users.service';
import { NotificationService } from '../_services/notification.service';
import { LoadingService } from '../_services/loading.service';
import { DeleteUserDialog } from './delete-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];
  usersInView: Array<User> = [];
  isHost: boolean = false;
  userFilter: string = '';

  constructor(
    private userService: UserService
    , private notificationService: NotificationService
    , private loadingService: LoadingService
    ,public dialog: MatDialog
    ) { }

  ngOnInit():void{
    this.isHost = localStorage.getItem('userRole') === "HOST";
    this.loadUsers();
  }

  loadUsers(){
    this.loadingService.show();
    this.userService.getPatients()
                    .subscribe(patients => {
                      this.users = patients;
                      this.usersInView = patients;
                      this.loadingService.hide();
                    });
  }

  onFilterChange(filter:string){
    if(!filter){
     this.userFilter = '';
    }
    this.usersInView = this.users.filter(u => u.fullName.toLowerCase().includes(filter.toLowerCase()));
  }

  onDeleteClick(user: User){
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      data:{
        users: this.users,
        selectedUserToDelete:user
      }
    });

    dialogRef.afterClosed().subscribe(userToReassign => {
      if(!userToReassign || userToReassign.id <=0){
        return;
      }
      this.loadingService.show();
      this.userService.deletePatients(user.id,userToReassign.id).subscribe(_ =>{
        this.loadingService.hide();
        this.notificationService.success("Los datos del usuario han sido reasignados correctamente");
      })
    });
  }

}
