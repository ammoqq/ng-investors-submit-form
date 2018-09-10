import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable()
export class ConfigService {

  private basePath = '/config';
  constructor(private db: AngularFireDatabase, public matSnackBar: MatSnackBar, private router: Router) { }

  getConfigA() {


  }

  getConfig(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }
}
