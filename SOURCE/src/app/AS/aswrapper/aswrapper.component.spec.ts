import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AswrapperComponent } from './aswrapper.component';

describe('AswrapperComponent', () => {
  let component: AswrapperComponent;
  let fixture: ComponentFixture<AswrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AswrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AswrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
