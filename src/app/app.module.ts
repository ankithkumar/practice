import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, } from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material';
import { MatDividerModule} from '@angular/material/divider';
import { UploadImageComponent } from '../app/uploadImage/uploadImage.component';
import { AppRoutingModule } from './app-routing.module';
import { GallaryComponent } from './gallary/gallary.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { FavoriteComponent } from './favorite/favorite.component';
import { RibbonsComponent } from './gallary/ribbons/ribbons.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LikeComponent,
    UploadImageComponent,
    GallaryComponent,
    FavoriteComponent,
    RibbonsComponent,
    DeleteComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
