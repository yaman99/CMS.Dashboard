import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
  @ViewChild('myDropdown', { static: false }) myDropdown: NgbDropdown;
  private routerSubscription: Subscription;
  userType:string;
  constructor(private authService: AuthService,private router: Router) { }
 
  ngOnInit(): void {
    this.userType=this.authService.getUserType();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.myDropdown) {
        this.myDropdown.close();
      }
    });
  
  }
  private modalService = inject(NgbModal);
  addCommunityPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  
  }
}
