import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {


  registerForm: FormGroup;
  returnUrl: string;
  loginError: Boolean;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private route: ActivatedRoute,
    private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/employees';
    this.loginError = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginRequest(f) {
    Object.keys(this.registerForm.controls).forEach(field => { // {1}
      const control = this.registerForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.registerForm.invalid) {
      return;
    }

    this.empService.loginRequest(f.username, f.password).subscribe(
      (result) => {
        //loginValid
        if (result.loginValid) {
          sessionStorage.setItem('auth_token', result.accessToken);
          sessionStorage.setItem('login_valid', result.loginValid);
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.loginError = true;
          this.registerForm.controls['password'].setValue('');
        }
      },
      (err) => {
        this.loginError = false;
        this.registerForm.controls['password'].setValue('');
      }
    )

  }

  userNameChange(){
    console.log(this.registerForm);
  }
}
