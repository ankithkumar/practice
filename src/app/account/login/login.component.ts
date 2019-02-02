import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import constants from './../../app.constant';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    loading: boolean = false;
    error: string = 'Welcome to login page'
    route = constants.ROUTE;

    constructor(private userService: UserService, private router: Router) {
        console.log('in login');
    }

    loginUser(email, password) {
        if (email == '' || password == '') {
            this.error = constants.PLACEHOLDER.FAILURE;
            return;
        }
        this.loading = true;
        this.error = null;
        this.userService.login(email, password)
            .subscribe((res:any) => {
                console.log('result recieved ', res);
                this.router.navigate([`/${this.route.gallary}`]);
                this.loading = false;
            }, (error: any) => {
                this.error = error,
                this.loading = false;
            })
    }
}