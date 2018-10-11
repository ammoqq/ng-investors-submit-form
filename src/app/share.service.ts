import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable()
export class ShareService {

  private basePath = '/investors';
  constructor(private db: AngularFireDatabase, public matSnackBar: MatSnackBar, private router: Router) { }

  submitInvestorToVerify(data) {
    const user = firebase.auth().currentUser;

    const obj = this.db.database.ref(this.basePath + '/' + user.uid);
    obj.push(data, (err) => {
      var message = "Successfully submitted form";
      if (err) {
        message = err.message;
      } else {
        this.router.navigate(['/index/account-details']).then(() => {

        });
      }

      this.matSnackBar.open(message, "", {
        duration: 2500,
      });
    });

  }


  submitCoinRequest(data) {
    const user = firebase.auth().currentUser;

    const obj = this.db.database.ref(/coinRequests/ + user.uid);
    obj.push(data, (err) => {
      var message = "Successfully submitted coin request";
      if (err) {
        message = err.message;
      } else {

        console.log('Success');
      }

      this.matSnackBar.open(message, "", {
        duration: 2500,
      });
    });

  }

  getShares(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }
}
