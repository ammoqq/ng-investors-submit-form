import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {e} from '@angular/core/src/render3';
import {AngularFireDatabase} from 'angularfire2/database';

// @ts-ignore
@Injectable()
export class UserService {

  constructor(
   private db: AngularFirestore,
   private afAuth: AngularFireAuth,
   private database: AngularFireDatabase
 ) {
 }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No status logged in');
        }
      });
    });
  }

  fetchUserData() {
    return new Promise<any>( (resolve, reject) => {
      this.database.list<any>(`investors/${firebase.auth().currentUser.uid}`)
        .valueChanges()
        .subscribe( submissions => {
          submissions.sort((n1, n2) => {
            if (n1.createdAt > n2.createdAt) { return 1; }
            if (n1.createdAt < n2.createdAt) { return -1; }
            return 0;
          });
          resolve(submissions[submissions.length - 1]);
        });
    });
  }

  updateCurrentUser(value) {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
