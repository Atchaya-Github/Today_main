import { TestBed } from '@angular/core/testing';

import { BotSeriveService } from './bot-serive.service';

describe('BotSeriveService', () => {
  let service: BotSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
