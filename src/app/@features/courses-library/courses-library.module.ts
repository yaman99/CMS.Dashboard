import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesLibraryRoutingModule } from './courses-library-routing.module';
import { CoursesLibraryComponent } from './courses-library.component';


@NgModule({
  declarations: [
    CoursesLibraryComponent
  ],
  imports: [
    CommonModule,
    CoursesLibraryRoutingModule
  ]
})
export class CoursesLibraryModule { }
