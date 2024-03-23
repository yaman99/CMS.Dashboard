import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityManagementComponent } from './community-management.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityManagementComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityManagementRoutingModule { }
