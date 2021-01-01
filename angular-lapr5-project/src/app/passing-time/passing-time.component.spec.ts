import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassingTimeComponent } from './passing-time.component';

describe('PassingTimeComponent', () => {
  let component: PassingTimeComponent;
  let fixture: ComponentFixture<PassingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassingTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
