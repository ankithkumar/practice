import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import _ from 'lodash';

@Component({
    selector: 'app-setting',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {
    editing: boolean = false;
    loading = false;
    user = null;
    message = "Welcome To Settings page";
    constructor(private userService: UserService) {
        console.log('in settings');
        this.getUserDetails();
    }

    getUserDetails() {
        this.userService.getUserDetails()
            .then((res : any) => {
                this.user = res.data;
                console.log('user ',this.user);
                this.loading = false;
            }), error => {
                console.log('settings');
                this.message = error;
            }
    }

    toggle() {
        this.editing = !this.editing;
    }

    saveDetails(name, email, password1, password2) {
        let details: any = {};

        if (name == "" && email == "" && (password1 == "" || password2 == "")) {
            return;
        }
        if (name !== "" && name != this.user.name) {
            details.name = name;
        }
        if (email !== "" && email != this.user.email) {
            details.email = email;
        }
        if (password1 !== "" && password2 != "") {
            if (password1 === password2) {
                details.password = password1;
            } else {
                this.message = 'Passwords are not matching!!!';
                return;
            }
        }
        if (_.isEmpty(details)) {
            return;
        }
        this.loading = true;
        this.userService.updateUser(details)
            .then(() => {
                this.message = 'Completed Loading';
                this.getUserDetails();
            })
            .catch(error => {
                this.message = error;
            })
            .finally(() => {
                this.editing = false;
                this.loading = false;
            });
    }
}