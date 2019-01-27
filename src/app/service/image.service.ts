import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Collection } from '../modal/collection';
import { Images } from '../modal/images';
import _ from 'lodash';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class ImageService {
    name = 'ImageCollection';
    baseUrl = 'http://localhost/backend';
    imageCollection: Collection[] = [];
    private collectionUpdated = new Subject();

    constructor(protected localStorage: LocalStorage, public userService: UserService,public http: HttpClient) {
      console.log('here in imageService');
      //remove this once update is implemented
      // this.setLocalStorage();
   }

   getCategories() {
       return new Promise<any>((resolve, reject) => {
        if (this.imageCollection.length != 0) {
            this.raiseUpdatedEvent();
            resolve([...this.imageCollection]);
            return;
        }
        this.getAll().subscribe(values => {
            this.imageCollection = this.categoriesTheValues(values);
            this.raiseUpdatedEvent();
            resolve(this.imageCollection);
            // this.initLocalStorage();
        }, error => {
            console.log('failed! ',error);
            reject(error);
        })
       });
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

    createCollection(value) {
        let coll = {
            title: value.Name,
            images: [this.createImageData(value)]
        }
        return coll;
    }

    createImageData(value) {
        return {
            img: value.Image,
            desc: value.Description,
            like: value.Like
        }
    }

    categoriesTheValues(values): Collection[] {
        let user = this.userService.getUser();
        let collections: Collection[] = [];
        let newCollections = _.filter(values, value => {
            if (value.email === user.email) {
                return value;
            }
        })
        console.log('collection is ', collections);
        _.each(newCollections, value => {
            if (collections.length == 0) {
                collections.push(this.createCollection(value));
            } else {
                let found = false;
                _.each(collections, collection => {
                    if (collection.title == value.Name) {
                        console.log('1', collection);
                        collection.images.push(this.createImageData(value));
                        found = true;
                    }
                })
                if (!found) {
                    collections.push(this.createCollection(value));   
                }
            }
            console.log('loop ', collections);
        })
        console.log('categories ', collections);
        return collections;
    }

    // initLocalStorage() {
    //     this.localStorage.getItem(this.name).subscribe((imagesCollection: Collection[]) => {
    //         if (imagesCollection === null) {
    //             console.log('firstTime');
    //             this.setLocalStorage();
    //         } else {
    //             console.log('userData is ', imagesCollection);
    //             this.imageCollection = imagesCollection;
    //             this.raiseUpdatedEvent();
    //         }
    //     }, (error) => {
    //         console.log('could not get the data!!', error);
    //     })
    // }
   
    raiseUpdatedEvent() {
        console.log('updating ', this.imageCollection);
        this.collectionUpdated.next([...this.imageCollection]);
    }

    getCollectionUpdatedListener() {
       return this.collectionUpdated.asObservable();
    }

    getCollection() {
        return [...this.imageCollection];
    }
    
    // setLocalStorage() {
    //     this.localStorage.setItem(this.name, this.imageCollection)
    //     .subscribe(imagesCollection => {
    //         console.log('set to  array!!', imagesCollection);
    //     }, (error) => {
    //         console.log('could not write the item !', error);
    //     })
    // }

    updateCollection(updatedVal) {
        this.imageCollection = updatedVal;
        // this.setLocalStorage();
    }

    fitInTheCategory(collection, data) {
        let isImageFound: boolean = false;
        let images = {
            img: data.images.img,
            desc: data.images.desc,
            like: data.images.like
        };
        _.forEach(collection, item => {
            if (item.title === data.title) {
                if (item.images) {
                    item.images.push(images);
                } else {
                    item.images = [];
                    item.images.push(images);
                }
                isImageFound = true;
            }
        })
        if (!isImageFound) {
            let item = {
                title: data.title,
                images: [
                    images
                ]
            };
            this.imageCollection.push(item);
        }
    }

    addToCategory(collection: Collection) {
        this.fitInTheCategory(this.imageCollection, collection);
        // this.setLocalStorage();
        this.raiseUpdatedEvent();
    }

    store(colletionData): Observable<any> {
        console.log(colletionData);
        return this.http.post(`${this.baseUrl}/store`, { data: colletionData })
        .pipe(map((res: Collection) => {
            console.log('here!! sent successfullty!!', res);
            return true;
        }),
        catchError(this.handleError));
    }
}