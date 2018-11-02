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

  getDarshanReport(){
    forkJoin(this.darshReportApiGroup).subscribe(
      result=>{
           console.log(result);
      },
      err=>{
           console.log(err);
      }
    )
  }

}
