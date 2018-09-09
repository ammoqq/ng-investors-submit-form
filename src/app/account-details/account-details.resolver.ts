import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import {AccountDetailsModel} from './account-details.model';


@Injectable()
export class AccountDetailsResolver implements Resolve<any> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<[AccountDetailsModel]> {
    return new Promise((resolve, reject) => {
      this.userService.fetchUserData()
        .then(res => {
            resolve(res);
          }
        , err => {
            this.router.navigate(['/login']);
            return reject(err);
          });
    });
  }

}
