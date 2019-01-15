import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})

export class ImageService {
    name = 'collection';
    baseUrl = 'http://localhost/backend';
    collection: any = [
        {
            title: 'outdoor',
            images: [
                {
                    img: 'https://www.gstatic.com/webp/gallery3/1.png',
                    desc: 'some description',
                    like: false
                }, {
                    img  : 'https://image.shutterstock.com/image-photo/parents-giving-children-piggyback-ride-450w-388719088.jpg',
                    desc : 'Parents giving children piggyback!!',
                    like : false
                },
                {
                    img: 'https://www.gstatic.com/webp/gallery3/1.png',
                    desc: 'this is another description',
                    like: false
                }
            ]
        },
        {
            title: 'family',
            images: [
                {
                    img: 'https://www.gstatic.com/webp/gallery3/1.png',
                    desc: 'something',
                    like: true
                }, {
                    img  : 'https://image.shutterstock.com/image-photo/parents-giving-children-piggyback-ride-450w-388719088.jpg',
                    desc : 'Parents giving children piggyback!!',
                    like : true
                },
                {
                    img: 'https://www.gstatic.com/webp/gallery3/1.png',
                    desc: 'this is another description',
                    like: false
                },
                {
                    img: 'https://www.gstatic.com/webp/gallery3/1.png',
                    desc: 'this is another description',
                    like: false
                }
            ]
        }, {
            title: 'ocean',
            images: [
                {
                    img: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg',
                    desc: 'ocean brings the peace',
                    like: false
                }, {
                    img: 'https://images.pexels.com/photos/37403/bora-bora-french-polynesia-sunset-ocean.jpg',
                    desc: 'this is another ocean',
                    like: true
                }, {
                    img: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg',
                    desc: 'turtles travels far in sea',
                    like: true
                }
            ]
        }
    ];

    private collectionUpdated = new Subject();

    constructor(protected localStorage: LocalStorage, public http: HttpClient) {
      this.getAll().subscribe(values => {
          console.log('got the values ', values);
      }, error => {
        console.log('failed! ',error);
      })
      console.log('here in imageService');
      this.init()
      this.collectionUpdated.next([...this.collection]);
      //remove this once update is implemented
      this.setLocalStorage();
   }

   getAll() {
        return this.http.get(`${this.baseUrl}/getCollection`).pipe(
        map(res => {
            return res['data'];
        }),
        catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        console.log('http error ', error);
        return throwError('Error! something Wrong happened');
    }

    init() {
        this.localStorage.getItem(this.name).subscribe((imagesCollection) => {
            if (imagesCollection === null) {
                console.log('firstTime');
                this.setLocalStorage();
            } else {
                console.log('userData is ', imagesCollection);
                this.collection = imagesCollection;
                this.raiseUpdatedEvent();
            }
        }, (error) => {
            console.log('could not get the data!!', error);
        })
   }

    raiseUpdatedEvent() {
        this.collectionUpdated.next([...this.collection]);
    }

    getCollectionUpdatedListener() {
       return this.collectionUpdated.asObservable();
    }

    getCollection() {
        return [...this.collection];
    }
    
    setLocalStorage() {
        this.localStorage.setItem(this.name, this.collection)
        .subscribe(imagesCollection => {
            console.log('set to  array!!', imagesCollection);
        }, (error) => {
            console.log('could not write the item !', error);
        })
    }

    updateCollection(updatedVal) {
        this.collection = updatedVal;
        this.setLocalStorage();
    }

    addToCategory(url, collectionName, description, liked = false) {
        let isImageFound: boolean = false;
        let image = {
                img: url,
                desc: description,
                like: liked
        };
        _.forEach(this.collection, item => {
            if (item.title === collectionName) {
                if (item.images) {
                    item.images.push(image);
                } else {
                    item.images = [];
                    item.images.push(image);
                }
                isImageFound = true;
            }
        })
        if (!isImageFound) {
            let item = {
                title: collectionName,
                images: [
                    image
                ]
            };
            this.collection.push(item);
        }
        this.setLocalStorage();
        this.raiseUpdatedEvent();
    }
}