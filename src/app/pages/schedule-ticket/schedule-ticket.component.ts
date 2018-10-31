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
  selectedPoojaType: any;
  calenderDates: Date[];

  scheduleDate: Date;
  edit:Boolean;

  constructor() {
    this.edit=true;
    this.calenderDates = [];
    let d = new Date();
    let currentMonth = d.getMonth();
    for (let i = currentMonth; i < currentMonth + 3; i++) {
      this.calenderDates.push(new Date(d.getFullYear(), i, 1));
    }
    this.cities = [
      { label: 'Select', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
    let content = [];


    let generalOrSpecialDarshan = [
      {
        timeSlots: [
          {
            timeOfDay: "Morning",
            slots: [
              [{ from: "04:00:00", to: "04:30:00", tickets: 0 },
              { from: "04:30:00", to: "05:00:00", tickets: 0 },
              { from: "05:00:00", to: "05:30:00", tickets: 0 },
              { from: "05:30:00", to: "06:00:00", tickets: 0 },
              { from: "06:00:00", to: "05:30:00", tickets: 0 },
              { from: "06:30:00", to: "07:00:00", tickets: 0 }],
              [{ from: "07:00:00", to: "07:30:00", tickets: 0 },
              { from: "07:30:00", to: "08:00:00", tickets: 0 },
              { from: "08:00:00", to: "08:30:00", tickets: 0 },
              { from: "08:30:00", to: "09:00:00", tickets: 0 },
              { from: "09:00:00", to: "09:30:00", tickets: 0 },
              { from: "09:30:00", to: "10:00:00", tickets: 0 }],
              [{ from: "10:30:00", to: "10:30:00", tickets: 0 },
              { from: "10:30:00", to: "11:00:00", tickets: 0 },
              { from: "11:00:00", to: "11:30:00", tickets: 0 },
              { from: "11:30:00", to: "12:00:00", tickets: 0 }],
            ]
          },
          {
            timeOfDay: "Afternoon",
            slots: [
              [{ from: "12:00:00", to: "12:30:00", tickets: 0 },
              { from: "12:30:00", to: "13:00:00", tickets: 0 },
              { from: "13:00:00", to: "13:30:00", tickets: 0 },
              { from: "13:30:00", to: "14:00:00", tickets: 0 },
              { from: "14:00:00", to: "14:30:00", tickets: 0 },
              { from: "14:30:00", to: "15:00:00", tickets: 0 }],
              [{ from: "15:00:00", to: "15:30:00", tickets: 0 },
              { from: "15:30:00", to: "16:00:00", tickets: 0 },
              { from: "16:00:00", to: "16:30:00", tickets: 0 },
              { from: "16:30:00", to: "17:00:00", tickets: 0 },
              { from: "17:00:00", to: "17:30:00", tickets: 0 },
              { from: "17:30:00", to: "18:00:00", tickets: 0 }],
            ]
          },
          {
            timeOfDay: "Evening",
            slots: [
              [{ from: "18:00:00", to: "18:30:00", tickets: 0 },
              { from: "18:30:00", to: "19:00:00", tickets: 0 },
              { from: "19:00:00", to: "19:30:00", tickets: 0 },
              { from: "19:30:00", to: "20:00:00", tickets: 0 },
              { from: "20:00:00", to: "20:30:00", tickets: 0 },
              { from: "20:30:00", to: "21:00:00", tickets: 0 }],
              [{ from: "21:00:00", to: "21:30:00", tickets: 0 },
              { from: "21:30:00", to: "22:00:00", tickets: 0 },
              { from: "22:00:00", to: "22:30:00", tickets: 0 },
              { from: "22:30:00", to: "23:00:00", tickets: 0 },
              { from: "23:00:00", to: "23:30:00", tickets: 0 },
              { from: "23:30:00", to: "24:00:00", tickets: 0 }],
            ]
          }
        ],
        serviceName: "e-Darshan"
      },
      {
        timeSlots: [
          {
            timeOfDay: "Morning",
            slots: [
              [{ from: "03:00:00", to: "03:30:00", tickets: 0 },
              { from: "03:30:00", to: "04:00:00", tickets: 0 }],
            ]
          }
        ],
        serviceName: "Mangala Aarti"
      },
      {
        timeSlots: [
          {
            timeOfDay: "Morning",
            slots: [
              [{ from: "11:00:00", to: "11:30:00", tickets: 0 },
              { from: "11:30:00", to: "12:00:00", tickets: 0 },
              { from: "12:30:00", to: "13:00:00", tickets: 0 }],
            ]
          }
        ],
        serviceName: "Bhog/Aarti"
      },
      {
        timeSlots: [
          {
            timeOfDay: "Evening",
            slots: [
              [{ from: "21:00:00", to: "21:30:00", tickets: 0 },
              { from: "21:30:00", to: "22:00:00", tickets: 0 },
              { from: "22:00:00", to: "22:30:00", tickets: 0 }],
            ]
          }
        ],
        serviceName: "Shringar"
      },
      {
        timeSlots: [
          {
            timeOfDay: "Evening",
            slots: [
              [{ from: "19:00:00", to: "19:30:00", tickets: 0 },
              { from: "19:30:00", to: "20:00:00", tickets: 0 },
              { from: "20:00:00", to: "20:30:00", tickets: 0 }],
            ]
          }
        ],
        serviceName: "Saptha Rushi Aarti"
      }
    ]

    this.darshanTabs = [
      { header: "General and Special Darshan", content: generalOrSpecialDarshan },
      { header: "VIP", content: content },
      { header: "Sr.Citizen & Divyang", content: content }
    ]

    this.selectedPoojaType = this.darshanTabs[0];
    // console.log(this.calenderDates);
  }

  ngOnInit() {
  }

  onCalendarDateClick(event) {
    this.scheduleDate = event;
  }

  onPoojaTypeSelect(link) {
    this.selectedPoojaType = link;
    console.log(link);
  }

  onTicketCountChange(event:any,serviceType:any){
    console.log(event)
  }
}
