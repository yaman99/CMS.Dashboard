import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instructor-community',
  templateUrl:'./instructor-community.component.html',
  styleUrls: ['./instructor-community.component.scss']
})
export class InstructorCommunityComponent {
  private modalService = inject(NgbModal);
	PostToCommunity(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
