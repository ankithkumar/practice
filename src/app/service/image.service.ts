import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ImageService {
    imageArray = [{
        img: 'https://www.gstatic.com/webp/gallery3/1.png',
        desc: 'some description',
        like: false
    }, {
        img: 'https://www.gstatic.com/webp/gallery3/1.png',
        desc: 'this is another description',
        like: false
    }];
    private postUpdated = new Subject<[]>();

    constructor(protected localStorage: LocalStorage) { 
      console.log('here in imageService');
      this.localStorage.getItem('image').subscribe((images) => {
        if (images === null) {
            console.log('firstTime');
            this.setLocalStorage();
        } else {
            console.log('userData is ', images);
            this.imageArray = images;
            this.postUpdated.next([...this.imageArray]);
        }
      }, (error) => {
        console.log('could not get the data!!', error);
     })
   }

   getPostUpdatedListener() {
       return this.postUpdated.asObservable();
    }
    
    setLocalStorage() {
        this.localStorage.setItem('image', this.imageArray)
        .subscribe(images => {
            console.log('set to  array!!', images);
        }, (error) => {
            console.log('could not write the item !', error);
        })
  }

  updateLike(item, val) {
    let index = this.imageArray.findIndex(element => {
        return (element.img == item.img && element.desc == item.desc);
    });
    this.imageArray[index].like = val;
    this.setLocalStorage();
    this.postUpdated.next([...this.imageArray]);
  }
  getImages() {
      return this.imageArray;
  }
}