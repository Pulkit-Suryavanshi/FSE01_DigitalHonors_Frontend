import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../profile/user/user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  action: string = 'Login';
  header: string = 'Already have an account?';
  isLoading: boolean = false;
  constructor(private loginService: LoginService,
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['action'] == 'forgotPassword'){
      this.action = 'Reset Password';
      this.header = 'Forgot your password?';
    }
    this.loginService.loggedInUser.subscribe((user:any) => {
      this.isLoading = false;
    })
  }
  login(formData:NgForm){
    this.isLoading = true;
    this.loginService.login(formData.value);
  }
  passwordReset(formData:NgForm){
    this.userService.resetPassword(formData.value)
      .subscribe((response:any) => {
        if(!response?.['error']){
          alert('Password reset successful');
          this.router.navigate(['/login']);
        }
      })
  }
}
