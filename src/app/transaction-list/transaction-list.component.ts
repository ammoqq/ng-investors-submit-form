import { Component, OnInit } from '@angular/core';
import {TransactionListService} from './transaction-list.service';
import {TransactionListModel} from './transaction-list.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: TransactionListModel[];
  displayedColumns: string[] =
    ['position', 'amountPaid', 'coinsBought', 'currency', 'info', 'paymentConfirmationId', 'transaction', 'approved'];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.transactions = routeData['transactionList'];
      console.log(this.transactions);
    });
  }

}
