// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import constant from './../app.constant';
import { Router, CanActivate } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import _ from 'lodash';


@Injectable({
    providedIn: 'root'
})

export class UserService {
  private loggedIn = false;
  route = constant.ROUTE;
  baseUrl = 'http://photocollection.xyz/backend';
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
      if (error.status == 401) {
          return throwError('Please enter correct credentials!');
      }
      return throwError('Error! something Wrong happened, check back Later');
   }

  login(email, password): Observable<any> { 
    let collection = {
        email,
        password
    }
    return this.http.post(`${this.baseUrl}/login`, { data: collection })
        .pipe(map((res: any) => {
            this.user = collection;
            this.setEmail(collection.email, this.route.gallary)
            return true;
        }),
        catchError(this.handleError));
  }
  
  getUser() {
      return this.user;
  }

  setEmail(user, route = null) {
    this.localStorage.setItem('auth_token', user)
        .subscribe(() => {
            this.loggedIn = true; 
            if (route) {
                this.router.navigate([`/${route}`]);
            }
        }, (error) => {
            console.log('error !', error);
        })
    }

  register(user) {
       return this.http.post(`${this.baseUrl}/register`, { data : user})
        .pipe(map((res: any) => {
            this.user = user;
            this.setEmail(user.email, this.route.upload);
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

    getUserDetails() {
        console.log('userDetails ', this.user);
        return new Promise(resolve => {
            let params = new HttpParams();
            let user = this.getUser();
            params = params.append('email', user.email);
            return this.http.get(`${this.baseUrl}/getUserDetails`, {params: params})
                .pipe(map(res => {
                    console.log(res);
                    resolve(res);  
                }),
                catchError(this.handleError))
                .toPromise();
            })
    }

    updateUser(details) {
        return new Promise((resolve, reject) => {
            details.oldEmail = this.getUser().email;
            return this.http.post(`${this.baseUrl}/updateDetails`, {data: details})
                .pipe(map(res => {
                    console.log('res from updateUser ', res);
                    if (details.email) {
                        return this.localStorage.setItem('auth_token', details.email)
                            .subscribe(() => {
                                this.user.email = details.email;
                                resolve(res);
                            }, error => {
                                reject('error occurred');
                            })
                    } else {
                        resolve(res);    
                    }
                }),
                catchError(this.handleError))
                .toPromise();
            });
    }
}