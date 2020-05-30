import { TestBed } from '@angular/core/testing';

import { SectionResolverService } from './section-resolver.service';

describe('SectionResolverService', () => {
  let service: SectionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
