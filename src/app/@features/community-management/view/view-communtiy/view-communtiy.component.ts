import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityHttpService } from '@features/community-management/Community-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from '@shared/services/notice.service';
import { result } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-communtiy',
  templateUrl: './view-communtiy.component.html',
  styleUrls: ['./view-communtiy.component.scss'],
})
export class ViewCommuntiyComponent implements OnInit {
  posts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  communityId: string;
  postForm: FormGroup;
  constructor(
    private commhttp: CommunityHttpService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private noticeService: NoticeService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.communityId = this.route.snapshot.params.id;
    this.getPost();
    this.postForm = this.fb.group({
      content: [''],
    });
  }
  getPost() {
    this.commhttp.getAllPosts(this.communityId).subscribe((res) => {
      this.posts.next(res.data);
    });
  }
  PostToCommunity(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      let model = {
        content: this.postForm.controls.content.value,
        community: this.communityId,
      };
      this.commhttp.addPost(model).subscribe((res) => {
        this.noticeService.successNotice('Your Post Added Successfully');
      });
    });
  }

  like(postId: string) {
    let model = {
      post: postId,
      community: this.communityId,
    };
    this.commhttp.likePost(model).subscribe(() => {
      this.getPost();
    });
  }
}
