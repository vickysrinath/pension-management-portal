import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private cookieService : CookieService,private authService : AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        console.log('Before :'+req)
        if(!this.cookieService.check('token')){
          console.log("no-token")
          console.log(req.body)
          return next.handle(req);
        }

        req = req.clone({
          setHeaders: {
            'Content-Type' : 'application/json; charset=utf-8',
            'Accept'       : 'application/json',
            'Authorization': `Bearer ${this.cookieService.get('token')}`,
          },
        });
        console.log("After :"+req);

        return next.handle(req);
      })
    );
  }
}
