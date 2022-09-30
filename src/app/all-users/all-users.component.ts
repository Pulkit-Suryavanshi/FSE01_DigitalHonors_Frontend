import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../profile/tweet-list/tweet/tweet.service';
import { UserService } from '../profile/user/user.service';

@Component({
  selector: 'allusers',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  username: string = '';
  user: any;
  AllUsers: any = [];
  isLoading: boolean = false;
  constructor(private userService: UserService, private tweetService: TweetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.isLoading = true;
    this.fetchAllUsers();
    this.route.params.subscribe(param => {
      this.username = param['username'];
      this.fetchAllUsers();
    });
  }
  fetchAllUsers() {
    this.userService.getAllUsers()
      .subscribe((response: any) => {
        this.AllUsers = response;
        this.isLoading = false;
      });
  }

}
