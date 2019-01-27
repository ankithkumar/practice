// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import constants from './../app.constant';

@Injectable({
    providedIn: 'root'
})

export class LoggedInGuard implements CanActivate {
  private notifyFocusHandler = new Subject();
  constructor(private user: UserService, private router: Router) {}

  getNotifyFocusHandlerObservable() {
    return this.notifyFocusHandler.asObservable();
  }

  canActivate(route) {
    let a = !!this.user.isLoggedIn();
    console.log('canActivate ', a + ' loggedIn ' + this.user.isLoggedIn());
    if (route.routeConfig.path == constants.ROUTE.login || route.routeConfig.path == constants.ROUTE.register) {
      if (!a) {
        console.log('next ');
        this.notifyFocusHandler.next(route.routeConfig.path);
      }
      return !a;
    }
    if (!a) {
      this.router.navigate([`/${constants.ROUTE.login}`]);
      this.notifyFocusHandler.next(constants.ROUTE.login);
    } else {
      this.notifyFocusHandler.next(route.routeConfig.path);
    }
    return a;
  }
}