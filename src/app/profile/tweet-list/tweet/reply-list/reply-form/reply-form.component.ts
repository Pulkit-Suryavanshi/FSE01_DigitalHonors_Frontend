import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login.service';

import { TweetService } from '../../tweet.service';
import { ReplyService } from '../reply/reply.service';

@Component({
  selector: 'reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  @Input() tweetId: string = '';
  @Input() repliedBy: string = '';
  @Output() replyAdded: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private tweetService: TweetService, private replyService: ReplyService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.repliedBy = this.loginService.loggedInUser.getValue()?.['username'];
  }

  replyToTweet(formData: NgForm){
    this.tweetService.replyToTweet(formData.value)
      .subscribe((response:any) => {
        if(!response?.['error']){
          this.replyService.addReply(formData.value);
          this.replyAdded.emit(true);
        }
      });
  }
}
