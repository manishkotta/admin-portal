import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }
}
