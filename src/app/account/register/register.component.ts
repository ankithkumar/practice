import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import constants from './../../app.constant';
import { Router, CanActivate } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    loading: boolean = false;
    error: string = 'Welcome to registration page';
    route = constants.ROUTE;

    constructor(private userService: UserService, private router: Router) {
        console.log('in registration');
    }

    regUser(username, email, password) {
        if (username == '' || email == '' || password == '') {
            this.error = constants.PLACEHOLDER.FAILURE;
            return;
        }
        this.loading = true;
        this.error = null;
        this.userService.register({username, email, password})
            .subscribe((res : any) => {
                console.log('result recieved ', res);
                this.router.navigate([`/${this.route.upload}`]);
                this.loading = false;
            }, (error: any) => {
                this.error = error || 'something wrong happended, check back later!',
                this.loading = false;
            })
    }
}