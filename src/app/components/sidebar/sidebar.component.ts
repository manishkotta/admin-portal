import { Component, OnInit } from '@angular/core';


interface link {
  text: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  links: link[];
  selectedLink: link;

  constructor() {

    this.links = [
      { text: 'Dashboard', route: '/dashboard', icon: 'fa fa-tachometer' },
      { text: 'Schedule & Ticket Management', route: '/schedule-ticket', icon: 'fa fa-calendar' },
      { text: 'Employees', route: '/employees', icon: 'fa fa-address-card-o' },
      { text: 'Notifications', route: '/notifications', icon: 'fa fa-bell-o' },
      { text: 'SMS Management', route: '/sms-management', icon: 'fa fa-mobile fa-lg' },
      { text: 'Reports', route: '/reports', icon: 'fa fa-bar-chart' }
    ];

    this.selectedLink = null;

  }

  ngOnInit() {
  }

  onSelect(l: link) {
    this.selectedLink = l;
  }

}
