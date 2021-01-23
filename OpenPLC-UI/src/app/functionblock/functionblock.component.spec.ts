import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionblockComponent } from './functionblock.component';

describe('FunctionblockComponent', () => {
  let component: FunctionblockComponent;
  let fixture: ComponentFixture<FunctionblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
