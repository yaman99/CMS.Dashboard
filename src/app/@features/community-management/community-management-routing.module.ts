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
        data: {
          source: 'list',
        },
      },
      {
        path: 'explore',
        component: ListComponent,
        data: {
          source: 'explore',
        },
      },
      {
        path: 'list/:id',
        component: ViewCommuntiyComponent,
      },
      {
        path: 'explore/:id',
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
