import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { ProfileService } from './profile.service';
import { TweetService } from './tweet-list/tweet/tweet.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  user: any;
  loggedInUser: any;
  tweets: any = [];
  isLoading: boolean = false;
  constructor(private userService: UserService,
    private loginService: LoginService,
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loginService.loggedInUser
      .subscribe((user:any) => {
        this.loggedInUser = user;
      });
    this.username = this.route.snapshot.params['username'];
    this.isLoading = true;
    this.fetchProfileInfo(this.username);
    this.route.params.subscribe(param => {
      this.username = param['username'];
      this.fetchProfileInfo(this.username);
    });
    this.profileService.tweets
      .subscribe((tweets:any[]) => {
        this.tweets = tweets;
      });
  }

  fetchProfileInfo(username:string){
    this.userService.getUsersByUsername(username)
      .subscribe((response: any) => {
        this.user = response[0];
        this.isLoading = false;
      });
    this.tweetService.getTweetsByUsername(username)
      .subscribe(response => {
        this.profileService.tweets.next(response);
      });
  }
}
