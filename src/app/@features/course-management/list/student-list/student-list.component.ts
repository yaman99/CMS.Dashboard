import { Component, OnInit } from '@angular/core';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { NoticeService } from '@shared/services/notice.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  videoPath = environment.filesPath;
  constructor(
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService
  ) {}

  ngOnInit() {
    this.coursestHttp.getStudentCourses().subscribe((res) => {
      this.courses.next(res.data);
      this.coursestHttp.setCoursesInStorage(res.data);
    });
  }
}
