import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareService } from '../share.service';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {

  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }
  ngOnInit() {
  }

}
