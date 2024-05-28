import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityManagementComponent } from './community-management.component';
import { ListComponent } from './list/list.component';
import { ExploreCommunitiesComponent } from './explore/explore-communities/explore-communities.component';
import { ViewCommuntiyComponent } from './view/view-communtiy/view-communtiy.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityManagementComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'view',
        component: ViewCommuntiyComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityManagementRoutingModule {}
