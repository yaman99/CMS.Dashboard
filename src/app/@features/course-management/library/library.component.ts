import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@shared/services/notice.service';
import { CourseManagementHttpService } from '../course-management-http.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  videoPath = environment.filesPath;
  constructor(
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService
  ) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursestHttp.getAllCourses().subscribe((res) => {
      this.courses.next(res.data);
      this.coursestHttp.setCoursesInStorage(res.data);
    });
  }
  addCourseToStudent(courseId: string) {
    let model = {
      courseId: courseId,
    };
    this.coursestHttp.applyOnCourse(model).subscribe((res) => {
      this.noticService.successNotice("You Applied on The Course");
    });
  }
}
