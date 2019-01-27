import { Component, OnDestroy } from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';
import constants  from './app.constant';
import { LoggedInGuard } from './service/logged.in.guard';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  route = constants.ROUTE;
  clicked = null;
  notifyClickHandler;
  constructor(private loggedInGuard: LoggedInGuard, private userService: UserService) {
    this.clickHandler();
  }

  clickHandler() {
    this.notifyClickHandler = this.loggedInGuard.getNotifyFocusHandlerObservable()
      .subscribe(route => this.clicked = route);
  }
  
  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.notifyClickHandler.unsubscribe();
  }
}

