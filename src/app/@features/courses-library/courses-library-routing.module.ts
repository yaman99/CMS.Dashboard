import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesLibraryComponent } from './courses-library.component';

const routes: Routes = [
{
  path:'',
  component:CoursesLibraryComponent,
},
{
  path:'view',
  component:CoursesLibraryComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesLibraryRoutingModule { }
