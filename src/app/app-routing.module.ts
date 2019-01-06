import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './uploadImage/uploadImage.component';
import { GallaryComponent } from './gallary/gallary.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [{
  path: '', component: UploadImageComponent, pathMatch: 'full'
}, {
  path: 'upload', component: UploadImageComponent
}, {
  path: 'gallary', component: GallaryComponent
}, {
  path: 'favorite', component: FavoriteComponent
}];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}