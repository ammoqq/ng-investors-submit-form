import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  user: FirebaseUserModel ;
  userDetails: any;
  imageBack: string;
  imageFront: string;
  constructor(
    public matDialog: MatDialog,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.userDetails = data;
        this.onUserFetch();
      }
    });
  }

  onUserFetch() {
    this.storage.storage.ref(`formPhotos/${firebase.auth().currentUser.uid}/${this.userDetails.documentBackId}`)
    .getDownloadURL()
      .then( res => {
        this.imageBack = res;
      });
      this.storage.storage.ref(`formPhotos/${firebase.auth().currentUser.uid}/${this.userDetails.documentFrontId}`)
      .getDownloadURL()
        .then( res => {
          this.imageFront = res;
        });
  }

}
