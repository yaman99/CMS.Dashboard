import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';

@Component({
  selector: 'app-add-course-details',
  templateUrl: './add-course-details.component.html',
  styleUrls: ['./add-course-details.component.scss'],
})
export class AddCourseDetailsComponent implements OnInit {
  Courseform: FormGroup;
  courseId : string;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService,
    private route:ActivatedRoute
  ) {}
  get f(){
    return this.Courseform.controls
  }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id
    const data = this.coursestHttp.getItemFromStorage().find(x => x.id ===  this.courseId);
    console.log(data.title , this.courseId);
    this.Courseform = this.fb.group({
      title: [data.title],
      subject: [data.subject],
      description: [data.description],
      status: [data.status],
      id:[this.courseId]
    });
  }

  getSubjectOptions(){
    return [
      {
        name:'math'
      },
      {
        name:'physics'
      },
      {
        name:'programming'
      },
      {
        name:'english'
      },
      {
        name:'turkish'
      },
    ]
  }

  onSave(){
    console.log(this.Courseform.value);
    this.coursestHttp.updateCourse(this.Courseform.value).subscribe(() => {

      this.noticService.successNotice("Courses updated Successfully");
      this.coursestHttp.getInstructorCourses();
    });
  }
}
