import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MootsTooltipComponent } from "./moots-tooltip-v12.component";

describe("MootsTooltipComponent", () => {
  let component: MootsTooltipComponent;
  let fixture: ComponentFixture<MootsTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MootsTooltipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MootsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
