import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSprintCComponent } from './planning-sprint-c.component';

describe('PlanningSprintCComponent', () => {
  let component: PlanningSprintCComponent;
  let fixture: ComponentFixture<PlanningSprintCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningSprintCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningSprintCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
