import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseManagementHttpService } from '@features/course-management/course-management-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss'],
})
export class AddLessonModalComponent implements OnInit {
  lessonForm: FormGroup;
  lessons: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Input() courseId: string;
  selectedFile: File | null = null;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private coursestHttp: CourseManagementHttpService,
    private noticService: NoticeService
  ) {}

  ngOnInit() {
    this.lessonForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }
  openAddLessinModal(content: any) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        let model = {
          title: this.lessonForm.controls.title.value,
          description: this.lessonForm.controls.description.value,
          video: this.selectedFile,
          course: this.courseId,
        };
        this.coursestHttp.addLesson(model).subscribe((result) => {
          this.noticService.successNotice('Lesson Added Successfully');
        });
      },
      (reason) => {}
    );
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
