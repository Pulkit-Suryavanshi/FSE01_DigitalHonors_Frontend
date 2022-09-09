import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { UserService } from '../profile/user/user.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  message: string = ''
  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  register(formData: NgForm){
    this.userService.register(formData.value)
      .subscribe((response:any) => {
        if(response.status == 201)
          this.loginService.login(formData.value);
      },
      (error:any) => {
          alert(error.error.msg);
      });
  }
}
