import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNotificationComponent } from './request-notification.component';

describe('RequestNotificationComponent', () => {
  let component: RequestNotificationComponent;
  let fixture: ComponentFixture<RequestNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
