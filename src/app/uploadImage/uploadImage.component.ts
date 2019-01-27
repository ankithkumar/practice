import { Component } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Images } from './../modal/images';
import { Collection } from './../modal/collection';
import constants from './../app.constant';

@Component({
    selector : 'app-uploadimage',
    templateUrl : './uploadImage.component.html'
})
export class UploadImageComponent {
    message: string;
    loading: boolean = false;
    placeholder = constants.PLACEHOLDER;

    constructor(public imageService: ImageService) {
        console.log('hi upload');
    }

    saveImage(url, category, description, liked = false) {
        this.message = null;
        if (url == "" || category == "" || description == "") {
            this.message = this.placeholder.FAILURE;
        } else {
            this.loading = true;
            let images: any = {
                img: url,
                desc: description,
                like: liked
            }
            let collection: Collection = {
                'title': category,
                'images': images
            }
            this.imageService.addToCategory(collection);
            this.imageService.store(collection)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.loading = false;
                        this.message = this.placeholder.SUCCESS;
                    }
                }, error => {
                    this.loading = false;
                    if (error.status == 201) {
                        return;
                    } 
                    this.message = this.placeholder.ERROR;
                })
            this.message = this.placeholder.SUCCESS;
        }
    }
}