import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth';
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
  likedPostsBefore: [];
  userType: string;
  constructor(
    private commhttp: CommunityHttpService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private noticeService: NoticeService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
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
        this.getPost();
      });
    });
  }
  isLikedBefore(postId: any) {
    let storage = JSON.parse(localStorage.getItem('postLikes') ?? '[]') as any[];

    if (storage) {
      const userid = JSON.parse(localStorage.getItem('auth')!).id;
      let existUser = storage.find((x) => x.user === userid) as { likedPosts: any[] };

      if (existUser) {
        return existUser.likedPosts.findIndex((x) => x === postId) === -1 ? false : true;
      }
      return false;
    }
  }

  deletePost(postId: string) {
    let model = {
      post: postId,
      community: this.communityId,
    };

    this.commhttp.deletePost(model).subscribe(() => {
      this.noticeService.successNotice(' Post Deleted');
      this.getPost();
    });
  }

  like(postId: string) {
    let apimodel = {
      post: postId,
      community: this.communityId,
    };

    let storage = JSON.parse(localStorage.getItem('postLikes') ?? '[]') as any[];

    if (storage) {
      const userid = JSON.parse(localStorage.getItem('auth')!).id;
      let existUser = storage.find((x) => x.user === userid);

      if (existUser) {
        this.likedPostsBefore = existUser.likedPosts.find((x: any) => x === postId);
        if (this.likedPostsBefore) {
          return;
        } else {
          existUser.likedPosts.push(postId);
          this.commhttp.likePost(apimodel).subscribe(() => {
            this.getPost();
          });
        }
      } else {
        let model = {
          user: userid,
          likedPosts: [postId],
        };
        console.log(model);

        storage.push(model);
      }

      localStorage.setItem('postLikes', JSON.stringify(storage));
    } else {
      localStorage.setItem('postLikes', JSON.stringify('{}'));
    }
  }
}
