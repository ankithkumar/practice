import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

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
            .subscribe((res : any) => {
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
        if (name !== "") {
            details.name = name;
        }
        if (email !== "") {
            details.email = email;
        }
        if (password1 !== "" && password2 != "") {
            if (password1.value === password2) {
                details.password = password1;
            } else {
                this.message = 'Passwords are not matching!!!';
                return;
            }
        }
        this.editing = false;
        this.loading = true;
        console.log(details);
    }
}