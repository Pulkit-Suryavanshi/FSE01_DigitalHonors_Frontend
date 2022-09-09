import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
  @Input() tweets: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
