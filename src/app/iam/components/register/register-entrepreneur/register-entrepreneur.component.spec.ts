import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEntrepreneurComponent } from './register-entrepreneur.component';

describe('RegisterEntrepreneurComponent', () => {
  let component: RegisterEntrepreneurComponent;
  let fixture: ComponentFixture<RegisterEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
