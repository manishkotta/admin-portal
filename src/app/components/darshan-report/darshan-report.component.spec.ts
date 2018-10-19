import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarshanReportComponent } from './darshan-report.component';

describe('DarshanReportComponent', () => {
  let component: DarshanReportComponent;
  let fixture: ComponentFixture<DarshanReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarshanReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarshanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
