import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseItemComponent } from './merchandise-item.component';

describe('MerchandiseItemComponent', () => {
  let component: MerchandiseItemComponent;
  let fixture: ComponentFixture<MerchandiseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchandiseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchandiseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
