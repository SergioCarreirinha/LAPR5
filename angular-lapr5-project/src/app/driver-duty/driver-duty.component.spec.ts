import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDutyComponent } from './driver-duty.component';

describe('DriverDutyComponent', () => {
  let component: DriverDutyComponent;
  let fixture: ComponentFixture<DriverDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
