import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-schedule-hours',
  templateUrl: './schedule-hours.component.html',
  styleUrls: ['./schedule-hours.component.css']
})
export class ScheduleHoursComponent implements OnInit {

  @Input() content : any;
  constructor() { }

  ngOnInit() {
  }

}
