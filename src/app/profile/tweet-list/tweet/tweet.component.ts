import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { ProfileService } from '../../profile.service';
import { ReplyService } from './reply-list/reply/reply.service';
import { TweetService } from './tweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [ReplyService]
})
export class TweetComponent implements OnInit {
  @Input() tweet: any = {};
  showReplyForm: boolean = false;
  showAllReplies: boolean = false;
  authUser: any = {};
  replies: any[] = [];
  constructor(private replyService: ReplyService,
    private tweetService: TweetService, 
    private profileService: ProfileService, 
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.replyService.replies
      .subscribe((replyList:any[]) => {
        this.replies = replyList;
      });
    this.authUser = this.loginService.loggedInUser.getValue();
  }
  likeTweet(){
    this.tweetService.likeTweet(this.tweet)
      .subscribe((response: any) => {
        if(!response?.['error']){
          this.tweet['likes'] += 1;
        }
      })
  }
  onReplyAdded(){
    this.showAllReplies = true;
  }
  loadReplies(){
    this.showAllReplies = !this.showAllReplies;
    if(this.showAllReplies){
      this.tweetService.getTweetReplies(this.tweet)
        .subscribe((response: any) => {
          this.replyService.replies.next(response);
        });
    }
  }
  deleteTweet(tweetId: string){
    this.tweetService.deleteTweet(tweetId)
      .subscribe((response:any) => {
        if(!response?.['error']){
          this.tweetService.getTweetsByUsername(this.tweet?.['createdBy'])
            .subscribe((tweetList: any) => {
              this.profileService.tweets.next(tweetList);
            })
        }
      });
      this.router.navigateByUrl('/profile/:username', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/timeline/:username']);
    }); 
  }
}
