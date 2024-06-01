import { Component, OnInit } from '@angular/core';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { DashboardHttpService } from '@features/dashboard/dashboard-http.service';
import { UserManagementHttpService } from '@features/users-management/user-management-http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  data = new BehaviorSubject<any>({});
  users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  ngOnInit(): void {
    this.userHttp.getUsers().subscribe((res) => {
      this.users.next(res);
    });
    this.dashHttp.getAdmintDashboard().subscribe((res) => {
      this.data.next(res.data);
    });
  }
  /**
   *
   */
  constructor(
    private dashHttp: DashboardHttpService,
    private userHttp:UserManagementHttpService
  ) {}
}
