import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {TransactionListModel} from './transaction-list.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {

  constructor(
    private database: AngularFireDatabase
  ) { }


  getUserTransactionList() {
    const userId = firebase.auth().currentUser.uid;
    return new Promise<TransactionListModel[]>( (resolve, reject) => {
      firebase.database().ref().child(`coinRequests/${userId}`).on('value', snap => {
        let data: TransactionListModel[] = [];
        snap.forEach( ss => {
          let model = ss.val();
            model.id = ss.key;
            this.isApproved(ss.key).subscribe(onNext => {
              model.approved = onNext.valueOf();
              data.push(model);
            });
          });
        resolve(data);
      });

    });

  }

  isApproved(key: string) {
    return new Observable<boolean>( resolve => {

      firebase.database().ref().child(`coinRequests/approved/${key}`).on('value', childSnap => {
        resolve.next( childSnap.val() || false);
      });
    });

  }
}
