import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  links: any[];
  isCollapsed: boolean;
  constructor() {
    this.isCollapsed = true;
    this.links = [
      {
        text: 'Devotee', route: 'devotee', nestedRoutes: [
          { text: 'Darshan Report', route: 'darshan-report' },
          { text: 'Time slot Report', route: 'time-slot-report' },
          { text: 'Live Devotee in/out', route: 'live-devotee-report' }
        ]
      },
      { text: 'Counter Report', route: '/counter-report' },
      { text: 'Access Card Report', route: '/access-card-report' }
    ];
  }

  ngOnInit() {
    
  }

}
