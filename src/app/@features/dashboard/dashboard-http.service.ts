import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const user_management_url = `${environment.dashboardUrl}`;
@Injectable({
  providedIn: 'root',
})
export class DashboardHttpService {
  constructor(private http: HttpClient) {}
  getInstructorDashboard(): Observable<any> {
    return this.http.get<any>(`${user_management_url}/get-instructor-dashboard`);
  }
  getStudentDashboard(): Observable<any> {
    return this.http.get<any>(`${user_management_url}/get-student-dashboard`);
  }

  getAdmintDashboard(): Observable<any> {
    return this.http.get<any>(`${user_management_url}/get-admin-dashboard`);
  }
}
