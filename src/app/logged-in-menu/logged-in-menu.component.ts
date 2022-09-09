import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'logged-in-menu',
  templateUrl: './logged-in-menu.component.html',
  styleUrls: ['./logged-in-menu.component.css']
})
export class LoggedInMenuComponent implements OnInit, OnDestroy {
  @Input() username: string = '';
  loginSubscription: Subscription = new Subscription();
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logout();
  }
  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
