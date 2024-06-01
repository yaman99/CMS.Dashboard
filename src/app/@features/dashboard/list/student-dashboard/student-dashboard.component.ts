import { Component, OnInit } from '@angular/core';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { DashboardHttpService } from '@features/dashboard/dashboard-http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  data = new BehaviorSubject<any>({});
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  ngOnInit(): void {
    this.coursestHttp.getStudentCourses().subscribe((res) => {
      this.courses.next(res.data);
      console.log(res.data);

    });
    this.dashHttp.getStudentDashboard().subscribe((res) => {
      this.data.next(res.data);
      console.log(res.data);

    });
  }
  /**
   *
   */
  constructor(
    private dashHttp: DashboardHttpService,
    private coursestHttp: CourseManagementHttpService
  ) {}
}
