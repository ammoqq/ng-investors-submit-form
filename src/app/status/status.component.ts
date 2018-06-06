import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {isFirebaseQuery} from 'angularfire2/database-deprecated/utils';
import * as firebase from 'firebase';

export class Submission {
  body: string;
}


@Component({
  selector: 'page-user',
  templateUrl: 'status.component.html',
  styleUrls: ['status.scss']
})
export class StatusComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {

  }


  // items: Observable<Submission[]>;
  userId: string;
  kycStatusLabel: string
  pendingText = "We are currently reviewing your latest kyc submission"
  noSubmissionText = "You haven't submitted any kyc form yet"

  onSubmissionChange() {

    if (!firebase.auth().currentUser.uid) {
      return;
    }

   this.db.list<Submission>(`investors/${firebase.auth().currentUser.uid}`)
      .valueChanges()
      .pipe(map( submissions => submissions.length ))
      .subscribe(length => {
        console.log('xxxxx');
      this.kycStatusLabel = length > 0 ? this.pendingText : this.noSubmissionText;
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
        this.onSubmissionChange();
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
