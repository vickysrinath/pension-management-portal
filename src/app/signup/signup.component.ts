import { AuthService } from './../common/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error=false;
  signupForm : FormGroup;
  message: String="";
  constructor(private http: HttpClientModule,private authService: AuthService,private router: Router) {
    this.signupForm=new FormGroup({});
  }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username' : new FormControl(null,[Validators.minLength(6),Validators.required]),
      'password' : new FormControl(null,[Validators.minLength(8),Validators.required])
    })
  }

  onSignup(){
    if(this.signupForm.valid){
      this.authService.signUp(this.signupForm.get('username')?.value,this.signupForm.get('password')?.value).subscribe(responseData=>{
        this.message="User successfully created please login";
        console.log(responseData);
        this.router.navigate(['login'],{queryParams:{message : 'user successfully created \n please login'}});

      },HttpErrorResponse=>{
        this.error=true;
        this.message=HttpErrorResponse.error;
        console.log(HttpErrorResponse.error);
      });;
    }


  }
}
