import { NoticeService } from './../../../@shared/services/notice.service';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CommunityHttpService } from '../Community-http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown', { static: false }) myDropdown: NgbDropdown;
  private routerSubscription: Subscription;
  userType: string;
  communityForm: FormGroup;
  communities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  mode = 'list';
  editMode = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private commhttp: CommunityHttpService,
    private noticeService: NoticeService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.data.source;
    console.log(this.mode);

    this.communityForm = this.fb.group({
      name: [''],
      subject: [''],
    });
    this.userType = this.authService.getUserType();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.myDropdown) {
        this.myDropdown.close();
      }
    });
    this.getCommunities();
  }
  join(id: string) {
    let model = {
      community: id,
    };
    this.commhttp.joinCommunity(model).subscribe(() => {
      this.noticeService.successNotice('Joined Succssfully');
      setTimeout(() => {
        this.router.navigate(['/community/list/', id]);
      }, 3);
    });
  }

  Leave(id: any) {
    let model = {
      community: id,
    };
    this.commhttp.leaveCommunity(model).subscribe(() => {
      this.noticeService.successNotice('You Left The Commuinty');
      this.getCommunities();
    });
  }
  getCommunities() {
    if (this.userType === 'admin' || (this.mode === 'explore' && this.userType === 'student')) {
      this.commhttp.getAllCommunities().subscribe((res) => {
        this.communities.next(res.data);
      });
    } else if (this.userType === 'instructor') {
      this.commhttp.getInstructorCommunities().subscribe((res) => {
        this.communities.next(res.data);
      });
    } else if (this.userType === 'student') {
      this.commhttp.getStudentCommunities().subscribe((res) => {
        this.communities.next(res.data);
      });
    }
  }
  submit() {
    let model = {
      name: this.communityForm.controls.name.value,
      subject: this.communityForm.controls.subject.value,
    };
    this.commhttp.addCommunity(model).subscribe(() => {
      this.noticeService.successNotice('Community Created Succssfully');
      this.getCommunities();
    });
  }
  deleteCommunity(id: any) {
    let model = {
      community: id,
    };
    this.commhttp.deleteCommunity(model).subscribe(() => {
      this.noticeService.successNotice('Community Deleted');
      this.getCommunities();
    });
  }
  editCommunityPopUp(content: TemplateRef<any>, community: any) {
    this.editMode = true;
    this.communityForm.patchValue(community);
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        let model = {
          name: this.communityForm.controls.name.value,
          subject: this.communityForm.controls.subject.value,
          community: community.id,
        };
        this.commhttp.updateCommunity(model).subscribe(() => {
          this.noticeService.successNotice('Community udpated Succssfully');
          this.getCommunities();
        });
      },
      (reason) => {}
    );
  }
  addCommunityPopup(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.submit();
      },
      (reason) => {}
    );
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
