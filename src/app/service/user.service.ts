// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import constant from './../app.constant';
import { Router, CanActivate } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import _ from 'lodash';
import { containsTree } from '@angular/router/src/url_tree';


@Injectable({
    providedIn: 'root'
})

export class UserService {
  private loggedIn = false;
  route = constant.ROUTE;
  baseUrl = 'http://localhost/backend';
  user: any = {};
  constructor(public http: HttpClient, protected localStorage: LocalStorage, private router: Router) {
    this.localStorage.getItem('auth_token')
        .subscribe(val => {
            console.log('local storage ', val);
            this.loggedIn = !!val;
            this.user.email = val;
            this.router.navigate([`/${this.route.gallary}`])
        }, error => {
            console.log('could not write the item !', error);
        });
    }

  isLoggedIn() {
    return this.loggedIn;
  }

  handleError(error: HttpErrorResponse) {
    console.log('http error ', error);
    return throwError('Error! something Wrong happened');
  }

  login(email, password): Observable<any> { 
    let collection = {
        email,
        password
    }
    return this.http.post(`${this.baseUrl}/login`, { data: collection })
        .pipe(map((res: any) => {
            this.user = collection;
            this.localStorage.setItem('auth_token', email)
                .subscribe(() => {
                    this.loggedIn = true;
                    this.router.navigate([`/${this.route.gallary}`])
                    console.log('here!! sent successfullty!!', res);    
                }, (error) => {
                    console.log('error !', error);
                })
            return true;
        }),
        catchError(this.handleError));
  }
  
  getUser() {
      return this.user;
  }

  register(user) {
       return this.http.post(`${this.baseUrl}/register`, { data : user})
        .pipe(map((res: any) => {
            this.user = user;
            this.localStorage.setItem('auth_token', user.email)
                .subscribe(() => {
                    this.loggedIn = true;
                    this.router.navigate([`/${this.route.upload}`])        
                })
            return true;
        }),
        catchError(this.handleError));
   }
   
   logout() {
        if (this.loggedIn) {
            this.localStorage.removeItem('auth_token')
                .subscribe(() => {
                    this.router.navigate([`/${this.route.login}`]);
                    this.loggedIn = false;
                    window.location.reload();
                })
        }
  }
}