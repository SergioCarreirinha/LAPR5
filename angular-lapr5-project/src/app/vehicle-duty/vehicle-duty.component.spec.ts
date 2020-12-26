import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDutyComponent } from './vehicle-duty.component';

describe('VehicleDutyComponent', () => {
  let component: VehicleDutyComponent;
  let fixture: ComponentFixture<VehicleDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
