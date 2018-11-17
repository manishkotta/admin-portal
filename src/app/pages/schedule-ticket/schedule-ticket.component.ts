import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';

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
  edit: Boolean;

  scheduleList: any;

  constructor(private scheduleService: ScheduleService) {
    this.edit = true;
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
    // console.log(this.calenderDates);
  }

  ngOnInit() {
    let content = [];

    this.darshanTabs = [
      { header: "General and Special Darshan", content: [] },
      { header: "VIP", content: [] },
      { header: "Sr.Citizen & Divyang", content: [] }
    ]

    this.selectedPoojaType = this.darshanTabs[0];
    this.scheduleService.getSchedule().subscribe(
      result => {
        if (result.status === 200) {
          this.scheduleList = result.scheduleList;
          this.processData(new Date());
        }
      },
      err => {

      }
    )

  }

  processData(date) {
    var day = date.getDay();

    if(!this.scheduleList) return;

    var currentSchedule = this.scheduleList.filter(s => {
      if (s.day === day) {
        return s;
      }
    });

    if (currentSchedule.length > 0) {
      var currentScheduleCopy = JSON.stringify(currentSchedule[0]);

      this.darshanTabs = [
        { header: "General and Special Darshan", content: JSON.parse(currentScheduleCopy) },
        { header: "VIP", content: JSON.parse(currentScheduleCopy) },
        { header: "Sr.Citizen & Divyang", content: JSON.parse(currentScheduleCopy) }
      ]

      this.selectedPoojaType = this.darshanTabs[0];
    }
    else {

    }

  }

  calculateToTime(fromTime) {
    if (!fromTime) return;
    var d = new Date();
    var parts = fromTime.match(/(\d+):(\d+)/);
    if (parts) {
      var hours = parseInt(parts[1]),
        minutes = parseInt(parts[2])
      d.setHours(hours, minutes + 30, 0, 0);
    }
    var x = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return x;
  }

  onCalendarDateClick(event) {
    this.scheduleDate = event;
    this.processData(this.scheduleDate);
  }

  onPoojaTypeSelect(link) {
    this.selectedPoojaType = link;
    console.log(link);
  }

  onTicketCountChange(event: any, serviceId: any, timeSlotId: any) {
    let day = this.scheduleDate.getDay();

    this.scheduleList.map(s => {
      if (s.day === day) {
        s.services.map(y => {
          if (y.serviceId === serviceId && y.timeSlots) {
            y.timeSlots.slots.map(t => {
              if (t.timeSlotId === timeSlotId) {
                t.tickets = parseInt(event.target.value,10);
              }
            });
          }
        })
      }
    });
  }
  
}
