import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../profile.service';
import { TweetService } from '../tweet/tweet.service';

@Component({
  selector: 'tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css']
})
export class TweetFormComponent implements OnInit {
  @Input() action: string = '';
  @Input() username: string = '';
  @Input() tweetId: string = '';
  content: string = '';
  constructor(private tweetService: TweetService, 
    private profileService: ProfileService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['action'] == 'edit'){
      this.action = 'Update';
      this.tweetService.getTweetById(this.route.snapshot.params['tweetId'])
        .subscribe((tweet:any) => {
          console.log('Tweet by id', tweet);
          this.content = tweet['content'];
          this.username = tweet['createdBy'];
          this.tweetId = tweet['id'];
        });
    }
    else{
      this.action = 'Post';
    }
  }
  postTweet(formData:NgForm){
    this.tweetService.postTweet(formData.value)
      .subscribe((response:any) => {
        if(!response?.['error']){
          const addedTweet = formData.value;
          addedTweet['id'] = response['id'];
          this.profileService.addTweet(addedTweet)
        }
      });
  }
  updateTweet(formData:NgForm){
    this.tweetService.editTweet(formData.value)
      .subscribe((response:any) => {
        if(!response?.['error']){
          this.router.navigate(['/profile', this.username]);
        }
      });
  }
}
