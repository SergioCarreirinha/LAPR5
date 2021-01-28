import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineService } from '../services/line/line.service';
import { NodeService } from '../services/node/node.service';
import { PathService } from '../services/path/path.service';

import { PathComponent } from './path.component';

describe('PathComponent', () => {
  let component: PathComponent;
  let fixture: ComponentFixture<PathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
