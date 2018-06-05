import { Component, ViewEncapsulation } from '@angular/core';
import {ShareService} from './share.service';
import {AuthService} from './core/auth.service';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
