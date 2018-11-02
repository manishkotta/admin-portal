import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Utilities } from '../utilities/utilities';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public router: Router) { }

  canActivate(): boolean {

    let _utilities = new Utilities();

    if (_utilities.IsUserAuthentated())
      return true;
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
