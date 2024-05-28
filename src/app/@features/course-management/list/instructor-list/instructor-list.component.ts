import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss'],
})
export class InstructorListComponent implements OnInit {
  Courseform: FormGroup;
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService
  ) {}

  ngOnInit() {
    this.coursestHttp.getInstructorCourses().subscribe(res => {
      this.courses.next(res.data);
      this.coursestHttp.setItemInStorage(res.data);
    })
    this.Courseform = this.fb.group({
      title: [''],
      subject: [''],
      description: [''],
    });
  }
  AddNewCoursePopUp(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.coursestHttp.addCourse(this.Courseform.value).subscribe((result) => {
          this.noticService.successNotice("Courses Added Successfully");
          this.coursestHttp.getInstructorCourses();
        });
      },
      (reason) => {}
    );
  }
}
