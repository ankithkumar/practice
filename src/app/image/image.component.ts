import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})

export class ImageComponent {
    @Input('image') imageSrc: string;
    @Input('description') description: string;

    constructor() {
        console.log('image component constructor');
        this.imageSrc = 'https://image.shutterstock.com/image-photo/boy-kicks-football-during-game-450w-693609082.jpg';
        this.description = 'this is a placeholder for image!!';
    }
}