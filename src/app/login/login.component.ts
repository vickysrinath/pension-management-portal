import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParseFlags } from '@angular/compiler';
import { map, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isMessagePresent=false;
  message="";
  response : any;
  loginForm : FormGroup;
  constructor(private activatedRoute : ActivatedRoute,private route :Router,private authService : AuthService,private cookieService :CookieService) {
    this.loginForm=new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'username' : new FormControl(null),
      'password' : new FormControl(null)
    });
    console.log(this.activatedRoute.snapshot.queryParams['message']);
    if(this.activatedRoute.snapshot.queryParams['message']){
        this.isMessagePresent=true;
        this.message=this.activatedRoute.snapshot.queryParams['message'];
      }
    }



  onLogin(){
    this.authService.login(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value).subscribe(responseData=>{
      this.response=responseData;
      console.log(this.response.expirydate);
      let expiryDate= new Date(this.response.expirydate);
      console.log(this.response.token+"\n"+expiryDate);
      this.cookieService.set("token",this.response.token,expiryDate);
      this.route.navigate(['/','home']);
    },
    err=>{
      this.isMessagePresent=true;
      this.message="Invalid username/password"
    })
  }

}
