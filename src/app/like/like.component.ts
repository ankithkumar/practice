import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector : 'app-like',
    templateUrl : 'like.component.html',
    styleUrls: ['./like.component.scss']
})

// export class className {}
export class LikeComponent {
    @Input('like') liked: boolean;
    @Output()
    
    change: EventEmitter<boolean>  = new EventEmitter<boolean>(); 
    constructor() {
        console.log('in likepage ', this.liked);
        // this.liked = false;
    }

    likedImage() {
        console.log('liked Image ', this.liked);
        this.liked = !this.liked;
        console.log('like 1', this.liked);
        this.change.emit(this.liked);
    }
}