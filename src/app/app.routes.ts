import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';
import { StatusResolver } from './status/status.resolver';
import { AuthGuard } from './core/auth.guard';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import {UserPaymentComponent} from './user-payment/user-payment.component';
<<<<<<< HEAD
import {AccountDetailsResolver} from './account-details/account-details.resolver';
=======
import {IndexPageComponent} from './index-page/index-page.component';
>>>>>>> master

export const rootRouterConfig: Routes = [
  { path: '', component: IndexPageComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'userPayment', pathMatch: 'full'},
      { path: 'userPayment', component: UserPaymentComponent, canActivate: [AuthGuard]  },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard],  resolve: { status: StatusResolver} },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard]  },
      { path: 'account-details', component: AccountDetailsComponent, canActivate: [AuthGuard], resolve: { accountDetails: AccountDetailsResolver, status: StatusResolver}}
    ]
  }
];
