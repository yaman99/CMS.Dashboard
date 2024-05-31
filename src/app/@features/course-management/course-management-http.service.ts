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

  getInstructorCourses(): Observable<any> {
    return this.http.get<any>(`${course_management_url}/get-instructor-courses`);
  }
  getStudentCourses(): Observable<any> {
    return this.http.get<any>(`${course_management_url}/get-student-courses`);
  }
  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${course_management_url}/get-courses`);
  }
  addCourse(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${course_management_url}/add-course`, payload);
  }
  updateCourse(payload: any): Observable<any[]> {
    return this.http.post<any[]>(`${course_management_url}/update-course`, payload);
  }

  applyOnCourse(payload:any){
    return this.http.post<any[]>(`${course_management_url}/apply-on-course`, payload);
  }

  //lessons

  addLesson(payload: any): Observable<any> {
    return this.http.post<any>(`${course_management_url}/add-lesson`, payload);
  }
  editLesson(payload: any): Observable<any> {
    return this.http.post<any>(`${course_management_url}/edit-lesson`, payload);
  }
  deleteLesson(payload: any): Observable<any> {
    return this.http.post<any>(`${course_management_url}/delete-lesson`, payload);
  }
  getLessons(courseId: any): Observable<any> {
    return this.http.get<any>(`${course_management_url}/get-lessons/${courseId}`);
  }


  //
  setCoursesInStorage(courses:any){
    localStorage.setItem('courses' , JSON.stringify(courses))
  }
  getCoursesFromStorage():any[]{
    return JSON.parse(localStorage.getItem('courses')!)
  }
  setLessonsInStorage(lessons:any){
    localStorage.setItem('lessons' , JSON.stringify(lessons))
  }
  getLessonsFromStorage():any[]{
    return JSON.parse(localStorage.getItem('lessons')!)
  }

}
