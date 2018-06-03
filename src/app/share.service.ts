import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class ShareService {

  private basePath = '/investors';
  constructor(private db: AngularFireDatabase) { }

  submitInvestorToVerify(data) {
    const user = firebase.auth().currentUser;

    const obj = this.db.database.ref(this.basePath + '/' + user.uid);
    obj.push(data);
    console.log('Success');
  }

  getShares(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }
}
