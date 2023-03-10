import { TestBed } from '@angular/core/testing';

import { HARTableService } from './har-table.service';

describe('HARTableService', () => {
  let service: HARTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HARTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
