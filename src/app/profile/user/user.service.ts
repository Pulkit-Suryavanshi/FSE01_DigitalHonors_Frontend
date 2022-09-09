import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{
    user:any = {};
    baseUrl: string = 'https://localhost:44311/api/v1.0/tweets'
    constructor(private http: HttpClient){
    }
    login(user: any){
        return this.http.post(this.baseUrl + '/login', user);
    }
    register(user: any){
        return this.http.post(this.baseUrl + '/register', user, {observe: 'response'});
    }
    getUsersByUsername(username: string){
        return this.http.get(this.baseUrl + '/user/search/' + username);
    }
    resetPassword(user: any){
        return this.http.post(this.baseUrl + '/' + user['username'] + '/forgot', user);
    }
}