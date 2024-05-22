import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const course_management_url = `${environment.coursesManagementUrl}`;
@Injectable({
  providedIn: 'root',
})
export class CourseManagementHttpService {
  constructor(private http: HttpClient) {}

  getInstructorCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${course_management_url}/get-instructor-courses`);
  }
  addCourse(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${course_management_url}/add-course`, payload);
  }

}
