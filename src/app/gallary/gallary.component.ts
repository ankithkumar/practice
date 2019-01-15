import { Component, OnDestroy } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Subscription } from 'rxjs';
import _ from 'lodash';

@Component({
    selector: 'app-gallary',
    templateUrl: 'gallary.component.html',
    styleUrls: ['gallary.component.scss']
})

export class GallaryComponent implements OnDestroy {    
    collections;

    private collectionSubscriber: Subscription;

    constructor(private imageService: ImageService) {
        console.log('this is gallary');
        this.collections = this.imageService.getCollection();

        this.collectionSubscriber = this.imageService.getCollectionUpdatedListener()
            .subscribe(imageCollections => {
                this.collections = imageCollections;
            });
    }

    Liked(likedImage, changedCollection) {
        _.each(changedCollection, image => {
            if (image.img === likedImage.img && image.desc === likedImage.desc) {
                console.log('found it');
                image = likedImage;
            }
        })
      _.each(this.collections, collection => {
          if (collection.title === changedCollection.title) {
              collection = changedCollection;
          }
      })
      this.imageService.updateCollection(this.collections);
    }

    ngOnDestroy() {
        this.collectionSubscriber.unsubscribe();
        console.log('in ngOnDestroy of list');
    }
}