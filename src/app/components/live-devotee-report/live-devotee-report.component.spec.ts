import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDevoteeReportComponent } from './live-devotee-report.component';

describe('LiveDevoteeReportComponent', () => {
  let component: LiveDevoteeReportComponent;
  let fixture: ComponentFixture<LiveDevoteeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDevoteeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDevoteeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
