import { Component, OnDestroy } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-gallary',
    templateUrl: 'gallary.component.html'
})

export class GallaryComponent implements OnDestroy {    
    imageArray;
    private Subscriber: Subscription;

    constructor(private imageService: ImageService) {
        console.log('this is gallary');
        this.imageArray = this.imageService.getImages();
        this.Subscriber = this.imageService.getPostUpdatedListener()
            .subscribe((images) => {
                this.imageArray = images;
            })
    }

    imageAction(evt, item) {
        this.imageService.updateLike(item, evt);
    }

    ngOnDestroy() {
        this.Subscriber.unsubscribe();
        console.log('in ngOnDestroy of list');
    }
}