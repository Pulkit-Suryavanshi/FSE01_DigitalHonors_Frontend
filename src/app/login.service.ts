import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { UserService } from "./profile/user/user.service";

@Injectable()
export class LoginService{
    loggedInUser: BehaviorSubject<any> = new BehaviorSubject<any>(false);
    constructor(private userService: UserService, private router: Router){}
    login(user: any){
        return this.userService.login(user)
            .subscribe((response:any) => {
                const authUser:any = {};
                authUser['username'] = user?.['username'];
                authUser['loggedIn'] = response['loggedIn'];
                this.loggedInUser.next(authUser);
                if(authUser['loggedIn'] == true){
                    this.router.navigate(['/profile',authUser['username']]);
                }
            },
            (error:any) => {
              alert(error.error.msg);
              const unauth: any = {};
              unauth['loggedIn'] = false;
              this.loggedInUser.next(unauth);
            });
    }
    isAuthenticated(){
        if(this.loggedInUser.getValue()?.['loggedIn'] == true)
            return true;
        return false;
    }
    logout(){
        this.loggedInUser.next({loggedIn: false});
        this.router.navigate(['/login']);
    }
}