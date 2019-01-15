import { Component } from '@angular/core';
import { ImageService } from '../service/image.service';

@Component({
    selector : 'app-uploadimage',
    templateUrl : './uploadImage.component.html'
})
export class UploadImageComponent {
    message: string;
    placeholder = {
      SUCCESS: 'Submitted succesfully',
      FAILURE: 'PLEASE FILL THE VALUES'  
    };

    constructor(public imageService: ImageService) {
        console.log('hi upload');
    }

    saveImage(url, category, description) {
        if (url == "" || category == "" || description == "") {
            this.message = this.placeholder.FAILURE;
        } else {
            this.imageService.addToCategory(url, category, description);
            this.message = this.placeholder.SUCCESS;
        }
    }
}