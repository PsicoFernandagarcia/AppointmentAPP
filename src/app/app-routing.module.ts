import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'login', loadChildren: ()=> import('./login/login.module')
    .then(m=>m.LoginModule)
  },
  {
    path:'dashboard', loadChildren: ()=> import('./dashboard/dashboard.module')
    .then(m=>m.DashboardModule),
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'ADMIN'
    // }
  },
  {
    path:'my-time', loadChildren: ()=> import('./my-time/my-time.module')
    .then(m=>m.MyTimeModule),
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'ADMIN'
    // }
  },
  {
    path:'new-appointment', loadChildren: ()=> import('./new-appointment/new-appointment.module')
    .then(m=>m.NewAppointmentModule),
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'ADMIN'
    // }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
