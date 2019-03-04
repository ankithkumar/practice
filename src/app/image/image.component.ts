import { Component, Input } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})

export class ImageComponent {
    @Input('image') imageSrc: string;
    @Input('description') description: string;
    defaultImage = '/assets/images/placeholder.jpg';
    offset = 100;
    
    constructor() {
        console.log('image component constructor');
        this.imageSrc = 'https://image.shutterstock.com/image-photo/boy-kicks-football-during-game-450w-693609082.jpg';
        this.description = 'this is a placeholder for image!!';
    }
}