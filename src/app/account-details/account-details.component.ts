import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import {AccountDetailsModel} from './account-details.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  userDetails: AccountDetailsModel;
  imageBack: string;
  imageFront: string;

  constructor(

    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['accountDetails'];
      this.userDetails = data;
      this.onUserFetch();
    });
  }

  private onUserFetch() {
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
