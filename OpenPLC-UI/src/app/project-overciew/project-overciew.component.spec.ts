import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverciewComponent } from './project-overciew.component';

describe('ProjectOverciewComponent', () => {
  let component: ProjectOverciewComponent;
  let fixture: ComponentFixture<ProjectOverciewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOverciewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverciewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
