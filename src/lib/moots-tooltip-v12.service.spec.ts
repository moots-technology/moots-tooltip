import { TestBed } from '@angular/core/testing';

import { MootsTooltipV12Service } from './moots-tooltip-v12.service';

describe('MootsTooltipV12Service', () => {
  let service: MootsTooltipV12Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MootsTooltipV12Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
