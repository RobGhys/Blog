import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { User } from '../user';
import { UserService } from '../user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private socialAuthService: SocialAuthService) { }

  // Async method
  getUsers(): void {
    // Wait to get the list of heroes
    // The subscribe() method passes the emitted array to the callback,
    // which sets the component's users property.
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['blog']));
  }
}
