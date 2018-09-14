import { Component, OnInit } from '@angular/core';

import { ShareService } from '../share.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import { PayuService } from './payu.service';
import { ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';


@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss']
})

export class UserPaymentComponent implements OnInit {
  [x: string]: any;
  ethAddress = "Loading the address..."
  kycStatusLabel = "You need to have KYC approved to send coins"
 // pendingText = "Your KYC submission has been approved"
  currencies = [ "Polish zloty (PLN)", "Euro (EUR)", "American dollar (USD)", "UK pound (GBP)", "Other"]
  private paymentConfirmationId = '';

  angForm: FormGroup;
  progressCompleted = false;

  uploadProgress: Observable<number>;
  chosenPayment: string;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
              private payuService: PayuService,
              private shareservice: ShareService,
              private fb: FormBuilder,
              private database: AngularFirestore,
              private storage: AngularFireStorage,
              private router: Router,
              public authService: AuthService,)
              {
                this.createForm();
              }
  createForm() {
    this.angForm = this.fb.group({
      options: ['', Validators.required ],
      currency: ['', Validators.required ],
      amountPaid: ['', Validators.required],
      coinsBought: ['', Validators.required ],
      transactionID: [''],
      info: [''],
    });
  }

  onFileChanged(event) {
    const user = firebase.auth().currentUser;
    this.paymentConfirmationId = Math.random().toString(36).substring(2);
    const ref = this.storage.ref('paymentConfirmation/' + user.uid + '/' + this.paymentConfirmationId);
    const task = ref.put(event.target.files[0]);
    this.uploadProgress = task.snapshotChanges()
      .pipe(
        map(s => (s.bytesTransferred / s.totalBytes) * 100),
        filter(progress => progress === 100),
        tap(() => this.progressCompleted = true)
      );
  }


  submitTransactionDetails() {
    let now = new Date();
    let dateUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    const body = Object.assign({}, this.angForm.value, { createdAt: dateUTC, paymentConfirmationId: this.paymentConfirmationId});
    this.shareservice.submitCoinRequest(body);
  }


  ngOnInit() {
    firebase.database().ref('/config').once('value').then(function(snapshot) {
      this.ethAddress = snapshot.toJSON()['crowdsaleETHAddress'].toString();
    });
  }

  payuButton() {
    // this.payuService.sendPayu().subscribe( data => console.log(data))

    this.payuService.getOAuth().subscribe( data => console.log(data))
  }

  goTo(index: number) {
    this.stepper.selectedIndex = index
  }


}
