import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{
    user:any = {};
    baseUrl: string = 'https://localhost:44311/api/v1.0/tweets'
    // baseUrl: string = 'api/api/v1.0/tweets'
    //https://comtweetapp20220929234140.azurewebsites.net //hosted api app service azure
    // baseUrl: string = 'https://comtweetapp20220929234140.azurewebsites.net/api/v1.0/tweets'
    constructor(private http: HttpClient){
    }
    login(user: any){
        return this.http.post(this.baseUrl + '/login', user);
    }
    register(user: any){
        return this.http.post(this.baseUrl + '/register', user, {observe: 'response'});
    }
    getAllUsers(){
        return this.http.get(this.baseUrl + '/users/all');
    }
    getUsersByUsername(username: string){
        return this.http.get(this.baseUrl + '/user/search/' + username);
    }
    resetPassword(user: any){
        return this.http.post(this.baseUrl + '/' + user['username'] + '/forgot', user);
    }
}