import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TweetService{
    tweets: Array<any> = [];
    baseUrl: string = 'https://localhost:44311/api/v1.0/tweets';
    // baseUrl: string = 'api/api/v1.0/tweets'
    constructor(private http: HttpClient){

    }
    getAllTweets(){
        return this.http.get(this.baseUrl + '/all');
    }
    getTweetsByUsername(username: string){
        return this.http.get(this.baseUrl + '/' + username);
    }
    getTweetById(tweetId: string){
        return this.http.get(this.baseUrl + '/details/' + tweetId);
    }
    postTweet(tweet: any){
        return this.http.post(this.baseUrl + '/' + tweet['createdBy'] + '/add', tweet);
    }
    editTweet(tweet: any){
        return this.http.put(this.baseUrl + '/' + tweet['username'] + '/update/' + tweet['tweetId'], tweet);
    }
    likeTweet(tweet: any){
        return this.http.put(this.baseUrl + '/' + tweet['createdBy'] + '/like/' + tweet['id'], {});
    }
    replyToTweet(reply: any){
        return this.http.post(this.baseUrl + '/' + reply['repliedBy'] + '/reply/' + reply['tweetId'], reply);
    }
    getTweetReplies(tweet: any){
        return this.http.get(this.baseUrl +'/reply/' + tweet['id']);
    }
    deleteTweet(tweet: any){
        return this.http.delete(this.baseUrl + '/' + tweet['createdBy'] + '/delete/' + tweet['id']);
    }
}