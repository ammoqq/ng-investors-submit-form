import {Component, OnInit} from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import {Unsubscribe} from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log("ccc")
        if (user && user.emailVerified) {
          this.router.navigate(['/index']);

        } else {
          console.log("ccc1")
          console.log(user)

        }
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/status']);
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/status']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/status']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {

      console.log(res);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
