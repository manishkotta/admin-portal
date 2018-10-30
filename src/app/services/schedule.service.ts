import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }


  getTimeSlots(): Observable<any> {
    return this.http.get(API_URL + "/schedule/gettimeslots?accesstoken=abcdpop");
  }

  getServices(): Observable<any> {
    return this.http.get(API_URL + "/schedule/getservices?accesstoken=abcdpop");
  }

}
