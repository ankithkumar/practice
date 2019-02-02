import { Component, OnDestroy } from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';
import constants  from '../app.constant';
import { LoggedInGuard } from '../service/logged.in.guard';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnDestroy {
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