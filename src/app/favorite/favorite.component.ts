import { Component } from '@angular/core';

@Component({
    selector : 'app-favorite',
    templateUrl : './favorite.component.html'
})
export class FavoriteComponent {
    img: string;
    desc: string;
    like: boolean;

    constructor() {
        this.img = 'https://image.shutterstock.com/image-photo/parents-giving-children-piggyback-ride-450w-388719088.jpg';
        this.desc = 'Parents giving children piggyback!!';
        this.like = false;
    }
    imageAction(updatedValue){
        this.like = updatedValue;
    }
}
