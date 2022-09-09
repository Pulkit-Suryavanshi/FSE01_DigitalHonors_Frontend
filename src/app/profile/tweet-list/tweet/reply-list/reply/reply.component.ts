import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() tweetId: string = '';
  @Input() reply: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
