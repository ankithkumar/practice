import { Component } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Images } from './../modal/images';
import { Collection } from './../modal/collection';
import constants from './../app.constant';

@Component({
    selector : 'app-uploadimage',
    templateUrl : './uploadImage.component.html',
    styleUrls: ['./uploadImage.component.scss']
})

export class UploadImageComponent {
    message: string;
    loading: boolean = false;
    placeholder = constants.PLACEHOLDER;
    initial: string = 'select type'
    collection = [];
    constructor(public imageService: ImageService) {
        this.collection.splice(0, 0, {name: this.initial});
        this.imageService.getCollectionName()
            .subscribe(res => {
                this.collection = res;
                this.collection.splice(0, 0, {name: this.initial});
                console.log('this.collection ', this.collection);
            }, error => {
                console.log('error in uploadImage is ', error);
            })
    }

    saveImage(url, description, category, selectCategory) {
        this.message = null;
        if (url == "" || description == "") {
            this.message = this.placeholder.FAILURE;
        } else if (selectCategory === this.initial && category == "") {
            this.message = this.placeholder.FAILURE;
        } else {
            category = selectCategory !== this.initial ? selectCategory : category;
            this.loading = true;
            let images: any = {
                img: url,
                desc: description,
                like: false
            }
            let collection: Collection = {
                'title': category,
                'images': images
            }
            this.imageService.addToCategory(collection);
            this.imageService.store(collection)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.message = this.placeholder.SUCCESS;
                    }
                }, error => {
                    if (error.status == 201) {
                        return;
                    } 
                    this.message = this.placeholder.ERROR;
                }, () => {
                    this.loading = false;
                })
            this.message = this.placeholder.SUCCESS;
        }
    }
}