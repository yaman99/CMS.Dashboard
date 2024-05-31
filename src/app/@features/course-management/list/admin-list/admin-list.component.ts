import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {
  Courseform: FormGroup;
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService
  ) {}

  ngOnInit() {
    this.coursestHttp.getAllCourses().subscribe(res => {
      this.courses.next(res.data);
      this.coursestHttp.setCoursesInStorage(res.data);
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
