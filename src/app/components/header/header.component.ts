import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "";
  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.init().subscribe((result) => {
          this.title = result;
    },
      (err) => {

      })
  }

  onLogOut(){
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('login_valid');
  }

}
