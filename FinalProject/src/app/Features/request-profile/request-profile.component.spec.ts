import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProfileComponent } from './request-profile.component';

describe('RequestProfileComponent', () => {
  let component: RequestProfileComponent;
  let fixture: ComponentFixture<RequestProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RequestProfileComponent]
    });
    fixture = TestBed.createComponent(RequestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
