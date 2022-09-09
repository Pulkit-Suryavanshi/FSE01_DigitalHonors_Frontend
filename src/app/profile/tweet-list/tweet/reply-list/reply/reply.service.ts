import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ReplyService{
    replies: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    addReply(reply: any){
        const replies = this.replies.getValue();
        replies.push(reply);
        this.replies.next(replies);
    }
}