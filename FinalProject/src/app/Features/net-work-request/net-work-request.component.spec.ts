import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorkRequestComponent } from './net-work-request.component';

describe('NetWorkRequestComponent', () => {
  let component: NetWorkRequestComponent;
  let fixture: ComponentFixture<NetWorkRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NetWorkRequestComponent]
    });
    fixture = TestBed.createComponent(NetWorkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
