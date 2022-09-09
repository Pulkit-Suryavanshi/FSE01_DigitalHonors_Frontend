import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedInMenuComponent } from './logged-in-menu/logged-in-menu.component';
import { NewUserMenuComponent } from './new-user-menu/new-user-menu.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserComponent } from './profile/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { TweetListComponent } from './profile/tweet-list/tweet-list.component';
import { TweetComponent } from './profile/tweet-list/tweet/tweet.component';
import { HttpClientModule } from '@angular/common/http';
import { TweetFormComponent } from './profile/tweet-list/tweet-form/tweet-form.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ReplyComponent } from './profile/tweet-list/tweet/reply-list/reply/reply.component';
import { ReplyListComponent } from './profile/tweet-list/tweet/reply-list/reply-list.component';
import { ReplyFormComponent } from './profile/tweet-list/tweet/reply-list/reply-form/reply-form.component'
import { AuthGuard } from './guards/auth-guard.service';
import { LoginService } from './login.service';
import { UserService } from './profile/user/user.service';
import { TweetService } from './profile/tweet-list/tweet/tweet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile/profile.service';
import { LoaderComponent } from './shared/loader/loader.component';

const appRoutes: Routes = [
  { path:'', component: LoginFormComponent },
  { path:'login', component: LoginFormComponent },
  { path:'register', component: RegistrationFormComponent },
  { path:'profile/:username', canActivate: [AuthGuard], component: ProfileComponent},
  { path:'timeline/:username', canActivate: [AuthGuard], component: TimelineComponent},
  { path:'tweet/:tweetId/:action', canActivate: [AuthGuard], component: TweetFormComponent},
  { path:':action', component: LoginFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoggedInMenuComponent,
    NewUserMenuComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    UserComponent,
    ProfileComponent,
    TweetListComponent,
    TweetComponent,
    TweetFormComponent,
    TimelineComponent,
    ReplyComponent,
    ReplyListComponent,
    ReplyFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, UserService, TweetService, LoginService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
