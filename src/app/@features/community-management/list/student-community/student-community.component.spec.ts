import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommunityComponent } from './student-community.component';

describe('StudentCommunityComponent', () => {
  let component: StudentCommunityComponent;
  let fixture: ComponentFixture<StudentCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCommunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
