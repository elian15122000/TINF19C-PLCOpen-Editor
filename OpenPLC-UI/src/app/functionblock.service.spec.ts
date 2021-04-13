import { TestBed } from '@angular/core/testing';

import { FunctionblockService } from './functionblock.service';

describe('FunctionblockService', () => {
  let service: FunctionblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
