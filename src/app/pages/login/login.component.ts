import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  registerForm: FormGroup;
  returnUrl : string;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService,private route: ActivatedRoute,
    private router: Router) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/employees';
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginRequest(f) {
    if (this.registerForm.invalid) {
      return;
    }

    this.empService.loginRequest(f.username, f.password).subscribe(
      (result) => {
        console.log(result);
        if (result) {
          sessionStorage.setItem('auth_token', result.accessToken);
          sessionStorage.setItem('login_valid',result.loginValid);
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      (err) => {
        console.log(err);
      }
    )

  }
}
