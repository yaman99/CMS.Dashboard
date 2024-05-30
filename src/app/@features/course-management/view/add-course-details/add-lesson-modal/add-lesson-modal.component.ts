import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() mode: 'edit' | 'add' = 'add';
  @Input() lessonId: string;
  @Output() reloadData = new EventEmitter<any>();
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
    if (this.mode === 'edit') {
      const lesson = this.coursestHttp.getLessonsFromStorage().find((x) => x.id === this.lessonId);
      this.lessonForm.patchValue({
        title: lesson.title,
        description: lesson.description,
      });
    }
  }
  openAddLessinModal(content: any) {
    const uploadData = new FormData();
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        uploadData.append('title', this.lessonForm.controls.title.value);
        uploadData.append('description', this.lessonForm.controls.description.value);
        uploadData.append('video', this.selectedFile!, this.selectedFile!.name);
        uploadData.append('course', this.courseId);
        this.coursestHttp.addLesson(uploadData).subscribe((result) => {
          this.noticService.successNotice('Lesson Added Successfully');
          this.reload();
        });
      },
      (reason) => {}
    );
  }

  openEditLessonModal(content: any) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        let model = {
          course: this.courseId,
          lesson: this.lessonId,
          title: this.lessonForm.controls.title.value,
          description: this.lessonForm.controls.description.value,
        };
        this.coursestHttp.editLesson(model).subscribe((result) => {
          this.noticService.successNotice('Lesson Updated Successfully');
          this.reload();
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
  reload() {
    this.reloadData.emit();
  }
}
