import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input() date: Date;
  weeks: any[];
  days: any[];
  constructor() {

    this.weeks = [];
    this.days = [];
  }

  ngOnInit() {
    var year = this.date.getFullYear();
    var month = this.date.getMonth();

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);

    let f = firstDay.getDate() - firstDay.getDay();
    let l = lastDay.getDate();
    let counter = 1;
    for (var i = f; i <= l; i++) {
      if (i <= 0) {
        this.days.push(null);
      }
      else {
        this.days.push(new Date(year, month, i))
      }
      if (counter % 7 == 0 || i === l) {
        this.weeks.push(this.days);
        this.days = [];
      }

      counter++
    }
    console.log(this.days);
    console.log(this.weeks);
  }

}
