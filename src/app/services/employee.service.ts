import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.baseApiUrl;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>(API_URL + '/employee/getemployees?accesstoken=qwerty');
  }

  addEmployee(employeeServiceObj: any): Observable<any> {
    return this.http.put<any>(API_URL + '/employee/addemployee', employeeServiceObj);
  }

  sendOtp(mobNum: String): Observable<any> {
    return this.http.get<any>("https://2factor.in/API/V1/9775cb52-f069-11e7-a328-0200cd936042/SMS/" + mobNum + "/AUTOGEN")
  }

  passwordReset(email: String): Observable<any> {
    return this.http.post(API_URL + "/authentication/forgotpassword?userid=" + email, "");
  }

  loginRequest(email: String, password: String): Observable<any> {
    return this.http.post(API_URL + "/authentication/login?userid=" + email + "&password=" + password, "");
  }
}


