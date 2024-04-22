import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children:[
      {
        path: 'view',
        component: ViewComponent,
      },
      {
        path: 'edit',
        component: FormComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
