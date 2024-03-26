import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-community',
  templateUrl: './student-community.component.html',
  styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent {
  private modalService = inject(NgbModal);
	PostToCommunity(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
