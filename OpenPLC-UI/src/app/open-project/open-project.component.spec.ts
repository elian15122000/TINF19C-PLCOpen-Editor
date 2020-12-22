import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenProjectComponent } from './open-project.component';

describe('OpenProjectComponent', () => {
  let component: OpenProjectComponent;
  let fixture: ComponentFixture<OpenProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
