import { UserDetails } from '../common/userdetails.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) { }

  signUp(username : string, password:string){
    const postData: UserDetails={username: username,password:password,role : "user"};
    return this.http.post(globalConstants.authserviceUri+'signup',postData);
  }
}
