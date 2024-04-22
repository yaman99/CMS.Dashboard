import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuInstructorComponent } from './sidebar-menu-instructor.component';

describe('SidebarMenuInstructorComponent', () => {
  let component: SidebarMenuInstructorComponent;
  let fixture: ComponentFixture<SidebarMenuInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMenuInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMenuInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
