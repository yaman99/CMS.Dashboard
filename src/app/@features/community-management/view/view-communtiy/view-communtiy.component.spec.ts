import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommuntiyComponent } from './view-communtiy.component';

describe('ViewCommuntiyComponent', () => {
  let component: ViewCommuntiyComponent;
  let fixture: ComponentFixture<ViewCommuntiyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommuntiyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommuntiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
