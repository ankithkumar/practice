import { Component, OnDestroy } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Subscription } from 'rxjs';
import _ from 'lodash';
import { Collection } from '../modal/collection';

@Component({
    selector: 'app-gallary',
    templateUrl: 'gallary.component.html',
    styleUrls: ['gallary.component.scss']
})

export class GallaryComponent implements OnDestroy {    
    collections: any = [];
    loading: boolean = true;
    error: string = null;
    private collectionSubscriber: Subscription;

    constructor(private imageService: ImageService) {
        console.log('this is gallary');
        this.loading = true;
        this.collectionSubscriber = this.imageService.getCollectionUpdatedListener()
            .subscribe(imageCollections => {
                this.collections = imageCollections;
                this.loading = false;
                console.log('this collection ', this.collections);
            }, error => {
                this.error = error;
                console.log('error occurred', error);
                this.loading = false;
            });
        this.imageService.getCategories()
            .then(collection => {
                console.log('val is ',collection);
                this.collections = collection;
            })
            .catch(error => {
                this.error = error;
                this.loading = false;
                console.log('error occurred', error);
            })
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