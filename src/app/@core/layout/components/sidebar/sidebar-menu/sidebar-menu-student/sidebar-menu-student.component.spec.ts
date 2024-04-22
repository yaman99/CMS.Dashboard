import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuStudentComponent } from './sidebar-menu-student.component';

describe('SidebarMenuStudentComponent', () => {
  let component: SidebarMenuStudentComponent;
  let fixture: ComponentFixture<SidebarMenuStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMenuStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMenuStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
