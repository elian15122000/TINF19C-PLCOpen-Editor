import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbswrapperComponent } from './fbswrapper.component';

describe('FbswrapperComponent', () => {
  let component: FbswrapperComponent;
  let fixture: ComponentFixture<FbswrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbswrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbswrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
