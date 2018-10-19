import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHoursComponent } from './schedule-hours.component';

describe('ScheduleHoursComponent', () => {
  let component: ScheduleHoursComponent;
  let fixture: ComponentFixture<ScheduleHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
