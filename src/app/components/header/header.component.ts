import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "";
  constructor(private titleService: TitleService,private router: Router) {
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
    this.router.navigateByUrl('/login');
  }

}
