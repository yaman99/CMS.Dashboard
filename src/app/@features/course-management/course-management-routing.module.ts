import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from './course-management.component';
import { StudentListComponent } from './list/student-list/student-list.component';
import { ListComponent } from '@features/course-management/list/list.component';
import { ViewComponent } from './view/view.component';
import { AddCourseDetailsComponent } from './view/add-course-details/add-course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CourseManagementComponent,
    children:[
      {
        path:"list",
        component:ListComponent,
      },
      {
        path:"view",
        component:ViewComponent,
      },
      {
        path:"AddDetails/:id",
        component:AddCourseDetailsComponent,
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
export class CourseManagementRoutingModule { }
