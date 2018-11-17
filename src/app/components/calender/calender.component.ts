import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input() date: Date;
  @Output() selectedDate = new EventEmitter<Date>();
  selDate : Date;
  currentDate:Date;
  weeks: any[];
  days: any[];
  constructor() {

    this.weeks = [];
    this.days = [];
    this.selDate = new Date();
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.selectedDate.emit(this.selDate);
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
    // console.log(this.days);
    // console.log(this.weeks);
  }

  dateSelected(d){
    this.selDate =d;
    this.selectedDate.emit(d);
  }

}
