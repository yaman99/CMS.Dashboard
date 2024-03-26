import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityManagementComponent } from './community-management.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityManagementComponent,
    children:[
      {
        path:"list",
        component:ListComponent,
      },
      {
        path:"",
        redirectTo:"list",
        pathMatch:"full",
      },

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityManagementRoutingModule { }
