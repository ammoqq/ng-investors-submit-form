import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { AccountDetailsModel } from './account-details.model';
import { AuthService } from '../core/auth.service';
import { ImageDialogComponent} from '../shared/image-dialog/image-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  userDetails: AccountDetailsModel;
  imageBack: string;
  imageFront: string;
  email: string;
  passReset: boolean;

  constructor(

    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['accountDetails'];
      this.userDetails = data;
      this.onUserFetch();
    });
    this.email = firebase.auth().currentUser["providerData"][0]["email"] ;
  }

  private onUserFetch() {
    this.storage.storage.ref(`formPhotos/${firebase.auth().currentUser.uid}/${this.userDetails.documentBackId}`)
      .getDownloadURL()
      .then(res => {
        this.imageBack = res;
      });
    this.storage.storage.ref(`formPhotos/${firebase.auth().currentUser.uid}/${this.userDetails.documentFrontId}`)
      .getDownloadURL()
      .then(res => {
        this.imageFront = res;
      });
  }

  resetPassword() {
    this.authService.resetPassword(this.email);
    this.passReset = true;
  }

  openDialog(name: string): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '500px',
      data : {image: name}
    });
  }

}
