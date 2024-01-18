import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { UserService } from './profile/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'twitter-app';
  private userSubscription: Subscription = new Subscription();
  loggedInStatus: boolean = false;
  appUsername: string = '';
  private _router: Router;

  constructor(private loginService: LoginService, router: Router){
    this._router = router;
    console.log("checking log");
  }
  ngOnInit(): void {
    this.userSubscription = this.loginService.loggedInUser
      .subscribe((user:any) => {
        this.appUsername = user?.['username'];
        this.loggedInStatus = user?.['loggedIn'];
      })
  }
  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }
  redirect(){
    console.log("Tweeet icon clicked!");
  this._router.navigateByUrl(`/timeline/${this.appUsername}`);
  }
}
