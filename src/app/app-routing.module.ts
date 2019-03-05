import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './uploadImage/uploadImage.component';
import { GallaryComponent } from './gallary/gallary.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoggedInGuard } from './service/logged.in.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '', component: UploadImageComponent, pathMatch: 'full', canActivate: [LoggedInGuard]
}, {
  path: 'upload', component: UploadImageComponent, canActivate: [LoggedInGuard]
}, {
  path: 'gallary', component: GallaryComponent, canActivate: [LoggedInGuard]
}, {
  path: 'favorite', component: FavoriteComponent, canActivate: [LoggedInGuard]
},{
  path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]
}, {
  path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]
}, {
  path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard]
},
{
  path: '**', component: GallaryComponent, canActivate: [LoggedInGuard]
}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}