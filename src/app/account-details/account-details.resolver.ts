import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../core/user.service';


@Injectable()
export class AccountDetailsResolver implements Resolve<any> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Promise<[any]> {
    let userDetails: any
    return new Promise((resolve, reject) => {
      this.userService.fetchUserData()
        .then(res => {
            userDetails = res;
            resolve(userDetails);
          }
        , err => {
            this.router.navigate(['/login']);
            return reject(err);
          };
    });
  }

}
