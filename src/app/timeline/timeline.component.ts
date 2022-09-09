import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../profile/tweet-list/tweet/tweet.service';
import { UserService } from '../profile/user/user.service';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  username: string = '';
  user: any;
  tweets: any = [];
  isLoading: boolean = false;
  constructor(private userService: UserService, private tweetService: TweetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.isLoading = true;
    this.fetchTimelineInfo(this.username);
    this.route.params.subscribe(param => {
      this.username = param['username'];
      this.fetchTimelineInfo(this.username);
    });
  }
  fetchTimelineInfo(username: string) {
    this.userService.getUsersByUsername(username)
      .subscribe((response: any) => {
        this.user = response[0];
        this.isLoading = false;
      });
    this.tweetService.getAllTweets()
      .subscribe(response => {
        this.tweets = response;
      })
  }

}
