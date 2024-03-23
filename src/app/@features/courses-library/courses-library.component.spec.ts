import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesLibraryComponent } from './courses-library.component';

describe('CoursesLibraryComponent', () => {
  let component: CoursesLibraryComponent;
  let fixture: ComponentFixture<CoursesLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
