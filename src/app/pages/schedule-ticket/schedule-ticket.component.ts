import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-ticket',
  templateUrl: './schedule-ticket.component.html',
  styleUrls: ['./schedule-ticket.component.css']
})
export class ScheduleTicketComponent implements OnInit {

  cities: any[];
  selectedCopyScheduleTo: any;
  darshanTabs: any[];
  selectedPoojaType : any;
  calenderDates:Date[];

  scheduleDate:Date;

  constructor() {
    this.calenderDates =[];
    let d = new Date();
    let currentMonth = d.getMonth();
    for(let i=currentMonth;i < currentMonth + 3;i++){
      this.calenderDates.push(new Date(d.getFullYear(),i,1));
    }
    this.cities = [
      { label: 'Select', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
    let content = [
      {
        TimeOfaDay: "Morning",
        data: [
          {
            hour: "5:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "6:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "7:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "8:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "9:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "10:00 am",
            availableTickets: 100,
            maxTickets: 200
          },
          {
            hour: "11:00 am",
            availableTickets: 200,
            maxTickets: 200
          }
        ]
      }
    ];
    this.darshanTabs = [
      { header: "General and Special Darshan", content: content },
      { header: "VIP", content: content },
      { header: "Sr.Citizen & Divyang", content: content }
    ]
    this.selectedPoojaType = this.darshanTabs[0];
    // console.log(this.calenderDates);
  }

  ngOnInit() {
  }

  onCalendarDateClick(event){
    this.scheduleDate=event;
  }

  onPoojaTypeSelect(link){
    this.selectedPoojaType = link;
  }
}
