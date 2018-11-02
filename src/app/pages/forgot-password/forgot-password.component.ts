import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: String;
  constructor(private empService: EmployeeService, private router: Router) {
    this.email = '';
  }

  ngOnInit() {
  }

  onForgotPassword() {
    this.empService.passwordReset(this.email).subscribe(
      (result) => {
        console.log(result);
        this.router.navigateByUrl("/login");
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
