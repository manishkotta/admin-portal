import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTicketComponent } from './schedule-ticket.component';

describe('ScheduleTicketComponent', () => {
  let component: ScheduleTicketComponent;
  let fixture: ComponentFixture<ScheduleTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
