import { Component, OnInit } from '@angular/core';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { DashboardHttpService } from '@features/dashboard/dashboard-http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss'],
})
export class InstructorDashboardComponent implements OnInit {
  data = new BehaviorSubject<any>({});
  courses: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  ngOnInit(): void {
    this.coursestHttp.getInstructorCourses().subscribe((res) => {
      this.courses.next(res.data);
    });
    this.dashHttp.getInstructorDashboard().subscribe((res) => {
      this.data.next(res.data);
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
