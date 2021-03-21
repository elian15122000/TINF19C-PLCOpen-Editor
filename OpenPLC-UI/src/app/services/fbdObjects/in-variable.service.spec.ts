import { TestBed } from '@angular/core/testing';

import { InVariableService } from './in-variable.service';

describe('InVariableService', () => {
  let service: InVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
