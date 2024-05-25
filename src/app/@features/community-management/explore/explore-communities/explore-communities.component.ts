import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-communities',
  templateUrl: './explore-communities.component.html',
  styleUrls: ['./explore-communities.component.scss']
})
export class ExploreCommunitiesComponent {
  isCourseAdded:boolean = false;
  joinCourse(){
this.isCourseAdded=true;
  }
}
