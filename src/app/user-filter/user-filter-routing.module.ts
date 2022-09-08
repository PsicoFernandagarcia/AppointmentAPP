import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFilterComponent } from './user-filter.component';

const routes: Routes = [
  {
    path: '',
    component:UserFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFilterRoutingModule { }
