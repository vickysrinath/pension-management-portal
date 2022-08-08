import { AuthService } from './common/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './common/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response :any;
  constructor(private cookieService: CookieService, private authService: AuthService) { }
  user = new BehaviorSubject<User | null>(null);
  title = 'pension-management-portal';

  ngOnInit(): void {
    if (this.cookieService.check('token')) {
      this.authService.validate(this.cookieService.get('token')).subscribe(responseData=>{
        this.response=responseData;
        const user=new User(this.response.username,this.response.token);
        this.authService.user.next(user);
        console.log("auto login");
      });
    }
  }

}

