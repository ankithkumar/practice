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
        console.log('in likepage');
        this.liked = false;
    }

    likedImage() {
        let like = !this.liked;
        console.log('like ', like);
        this.change.emit(like);
    }
}