import { Component } from '@angular/core';

@Component({
    selector: 'app-setting',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {
    editing: boolean = false;
    constructor() {
        console.log('in settings');
    }
}