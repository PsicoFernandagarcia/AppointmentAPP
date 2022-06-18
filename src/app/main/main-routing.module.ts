import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'login', loadChildren: () => import('../login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module')
          .then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ADMIN,HOST,COMMON'
        }
      },
      {
        path: 'my-time', loadChildren: () => import('../my-time/my-time.module')
          .then(m => m.MyTimeModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ADMIN,HOST,COMMON'
        }
      },
      {
        path: 'new-appointment', loadChildren: () => import('../new-appointment/new-appointment.module')
          .then(m => m.NewAppointmentModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ADMIN,HOST,COMMON'
        }
      },
      {
        path: 'history', loadChildren: () => import('../history/history.module')
          .then(m => m.HistoryModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ADMIN,HOST,COMMON'
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
