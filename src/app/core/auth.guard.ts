import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, CanActivateChild} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../core/user.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {

        if (user && user.emailVerified === true) {
          return resolve(true);
        } else {
          return resolve(true);
        }

      }, err => {
        this.router.navigate(['/login']);
        return resolve(false);
      });
    })
  }

  canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.canActivate(route)
  }

}
