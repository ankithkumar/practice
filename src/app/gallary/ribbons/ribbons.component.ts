import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-ribbon',
    templateUrl: 'ribbons.component.html',
    styleUrls: ['ribbons.component.scss']
})

export class RibbonsComponent {
    @Input() collection: any;
    @Output()
    
    isLiked: EventEmitter<{}> = new EventEmitter<{}>();

    constructor() {
        console.log('in ribbon component');
    }

    imageAction(evt, image) {
        image.like = evt;
        console.log('in image action ', image);
        this.isLiked.emit(image);
    }
} 