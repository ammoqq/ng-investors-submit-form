import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, CanActivateChild} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../core/user.service';


@Injectable()
export class AnonymousGuard implements CanActivate {


  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/index']);
        return resolve(false)
      }, err => {
        return resolve(true);
      });
    })
  }



}
