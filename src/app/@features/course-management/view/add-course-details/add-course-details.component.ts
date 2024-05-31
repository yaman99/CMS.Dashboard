import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-course-details',
  templateUrl: './add-course-details.component.html',
  styleUrls: ['./add-course-details.component.scss'],
})
export class AddCourseDetailsComponent implements OnInit {
  Courseform: FormGroup;
  courseId: string;
  lessons: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private fb: FormBuilder,
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService,
    private route: ActivatedRoute
  ) {}
  get f() {
    return this.Courseform.controls;
  }
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;
    const data = this.coursestHttp.getCoursesFromStorage().find((x) => x.id === this.courseId);
    this.getLessons();
    this.Courseform = this.fb.group({
      title: [data.title],
      subject: [data.subject],
      description: [data.description],
      status: [data.status],
      id: [this.courseId],
    });
  }

  openVideo(videoName: string) {
    window.location.href = environment.filesPath + '/' + videoName;
  }

  deleteLesson(lessonId: any) {
    let model = {
      lesson: lessonId,
      course: this.courseId,
    };
    this.coursestHttp.deleteLesson(model).subscribe((res) => {
      this.lessons.next(res.data);
      this.noticService.successNotice('Course Deleted');
      this.getLessons();
    });
  }

  getSubjectOptions() {
    return [
      {
        name: 'math',
      },
      {
        name: 'physics',
      },
      {
        name: 'programming',
      },
      {
        name: 'english',
      },
      {
        name: 'turkish',
      },
    ];
  }

  getLessons() {
    this.coursestHttp.getLessons(this.courseId).subscribe((res) => {
      this.lessons.next(res.data);
      this.coursestHttp.setLessonsInStorage(res.data);
    });
  }

  onSave() {
    this.coursestHttp.updateCourse(this.Courseform.value).subscribe(() => {
      this.noticService.successNotice('Courses updated Successfully');
      this.coursestHttp.getInstructorCourses();
    });
  }
}
