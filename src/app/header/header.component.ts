import { AuthService } from './../common/auth.service';
import { LoginComponent } from './../login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn=false;
  username: string | undefined;
  private userSub : Subscription | undefined;
  constructor(private cookieService : CookieService,private authService : AuthService) {

   }
  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isUserLoggedIn=!!user
      this.username=user?.username;
    })
  }
  logout(){
    this.authService.logout();
  }
}
