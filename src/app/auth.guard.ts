import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './common/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isUserLoggedIn: boolean=false;
  constructor(private authService : AuthService,private cookieService :CookieService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log("insdie auth Guard");
      if(!this.cookieService.check('token')){
        this.router.navigate(['/login']);
        return false;
      }
      else{
        return true;
      }
  }

}
