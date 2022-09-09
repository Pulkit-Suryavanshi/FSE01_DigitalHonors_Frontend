import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ProfileService{
    tweets: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    addTweet(tweet:any){
        const tweets = this.tweets.getValue();
        tweets.push(tweet);
        this.tweets.next(tweets);
    }
}