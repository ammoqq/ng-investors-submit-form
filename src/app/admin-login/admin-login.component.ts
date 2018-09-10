import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  hide = true;
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
