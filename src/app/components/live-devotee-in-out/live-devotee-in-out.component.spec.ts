import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDevoteeInOutComponent } from './live-devotee-in-out.component';

describe('LiveDevoteeInOutComponent', () => {
  let component: LiveDevoteeInOutComponent;
  let fixture: ComponentFixture<LiveDevoteeInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDevoteeInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDevoteeInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
