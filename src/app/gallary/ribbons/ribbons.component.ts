import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';

@Component({
    selector: 'app-ribbon',
    templateUrl: 'ribbons.component.html',
    styleUrls: ['ribbons.component.scss']
})

export class RibbonsComponent {
    @Input() collection: any;
    placeholder: string = null;
    updating = 'updating';
    selectedImage: string = null;
    // isLiked: EventEmitter<{}> = new EventEmitter<{}>();

    constructor(private imageService: ImageService) {
        console.log('in ribbon component');
    }

    imageAction(evt, image) {
        image.like = evt;
        this.placeholder = this.updating;
        this.selectedImage = image.img;
        console.log('img ', image);
        this.imageService.updateFavorite(this.collection.title, image)
            .subscribe(
                res => {
                    this.placeholder = null,
                    this.selectedImage = null;
                },
                error => {
                    this.placeholder = "error"
                })
    }
} 