import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';
import {TransactionListModel} from './transaction-list.model';
import {TransactionListService} from './transaction-list.service';

@Injectable()
export class TransactionListResolver implements Resolve<TransactionListModel[]> {

  constructor(public transactionList: TransactionListService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<TransactionListModel[]> {


    return new Promise((resolve, reject) => {
      this.transactionList.getUserTransactionList()
        .then(res => {
          return resolve(res);
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        });
    });
  }
}
