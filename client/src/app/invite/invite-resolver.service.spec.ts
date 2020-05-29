import { TestBed } from '@angular/core/testing';

import { InviteResolverService } from './invite-resolver.service';

describe('InviteResolverService', () => {
  let service: InviteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
