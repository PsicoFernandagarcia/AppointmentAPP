import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'', loadChildren: ()=> import('./home/home.module')
    .then(m=>m.HomeModule)
  },
  
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) }
  ,{
    path:'**', loadChildren: ()=> import('./home/home.module')
    .then(m=>m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
