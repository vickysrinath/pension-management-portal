import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap, catchError, throwError } from 'rxjs';
import { globalConstants } from './global-constants';
import { User } from './user.model';
import { UserDetails } from './userdetails.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  response: any;

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,private cookieService : CookieService,private router : Router) { }

  login(username: string, password: string) {
    const postData: UserDetails = { username: username, password: password }
    return this.http.post<User>(globalConstants.authserviceUri + 'authenticate', postData).pipe(tap(respData=>{
      const user= new User(respData.username,respData.token);
      this.user.next(user);
    }));
  }

  signUp(username : string, password:string){
    const postData: UserDetails={username: username,password:password,role : "user"};
    return this.http.post(globalConstants.authserviceUri+'signup',postData);
  }

  validate(token : string){
    console.log("Inside validate")
    return this.http.get<User>(globalConstants.authserviceUri+'validate');
  }
  logout(){
    this.user.next(null);
    this.cookieService.delete('token');
    this.router.navigate(['login']);
  }
}
