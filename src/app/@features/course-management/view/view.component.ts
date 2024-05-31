import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { CourseManagementHttpService } from '../course-management-http.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticeService } from '@shared/services/notice.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  userType: string;
  courseId: string;
  isEnrolled = false;
  currentLesson: BehaviorSubject<any> = new BehaviorSubject<any>({});
  course: any;
  videoPath = environment.filesPath;
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
  constructor(
    private authService: AuthService,
    private coursestHttp: CourseManagementHttpService,
    private route: ActivatedRoute,
    private noticService: NoticeService,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.userType = this.authService.getUserType();
    const path = this.route.snapshot.data.source;
    if (path === 'list') {
      this.isEnrolled = true;
    }
    this.courseId = this.route.snapshot.params.id;
    this.course = this.coursestHttp.getCoursesFromStorage().find((x) => x.id === this.courseId);
    this.watchLesson(1);
  }

  watchLesson(lessonIndex: any) {
    this.currentLesson.next(this.course.lessons[lessonIndex]);
    this.videoPlayer.nativeElement.load();
  }

  getLessonData(prop: any) {
    let value = '';
    this.currentLesson.subscribe((x) => (value = x[prop]));
    return value;
  }
  addCourseToStudent(courseId: string) {
    let model = {
      courseId: courseId,
    };
    this.coursestHttp.applyOnCourse(model).subscribe((res) => {
      this.noticService.successNotice('You Applied on The Course');
      setTimeout(() => {
        this.router.navigate(['/courses/list/', this.courseId ]);
      }, 3);
    });
  }
}
