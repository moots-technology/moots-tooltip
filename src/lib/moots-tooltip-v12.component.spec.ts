import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MootsTooltipV12Component } from './moots-tooltip-v12.component';

describe('MootsTooltipV12Component', () => {
  let component: MootsTooltipV12Component;
  let fixture: ComponentFixture<MootsTooltipV12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MootsTooltipV12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MootsTooltipV12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
