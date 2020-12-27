import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBlockComponent } from './work-block.component';

describe('WorkBlockComponent', () => {
  let component: WorkBlockComponent;
  let fixture: ComponentFixture<WorkBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkBlockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
