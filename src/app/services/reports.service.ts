import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.baseApiUrl;
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  darshReportApiGroup: any[];
  constructor(private http: HttpClient) {
    let dateWiseServiceCount = this.http.get(API_URL + '/reports/datewiseservicecount?accesstoken=abcdpop');
    let typeWiseDarshanCount = this.http.get(API_URL + '/reports/typewisedarshancount?accesstoken=abcdpop');
    let onlineBookingCount = this.http.get(API_URL + '/reports/onlinebookingscount?accesstoken=abcdpop');

    this.darshReportApiGroup = [dateWiseServiceCount, typeWiseDarshanCount, onlineBookingCount];
  }

  getDarshanReport(bookingType:String):Observable<any> {
    return this.http.get(API_URL+'/reports/onlinebookingscount?accesstoken=abcdpop&bookingtype=' + bookingType);
  }

  getLiveInOutReport(): Observable<any> {
    return this.http.get(API_URL + '/reports/entryexitcount?accesstoken=abcdpop');
  }

  getHourlyReport(date:String): Observable<any> {
    return this.http.get(API_URL + '/reports/hourlyservicecount?accesstoken=qwerty&date='+date);
  }

}
