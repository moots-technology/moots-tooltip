import { TestBed } from "@angular/core/testing";

import { MootsTooltipService } from "./moots-tooltip-v12.service";

describe("MootsTooltipService", () => {
  let service: MootsTooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MootsTooltipService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
