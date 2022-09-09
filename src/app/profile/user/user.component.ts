import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
