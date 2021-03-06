import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';
import { StatusResolver } from './status/status.resolver';
import { AuthGuard } from './core/auth.guard';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { AnonymousGuard } from './core/anonymous.guard';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionListService } from './transaction-list/transaction-list.service';
import { TransactionListResolver } from './transaction-list/transaction-list.resolver';
import { AccountDetailsResolver } from './account-details/account-details.resolver';
import { IndexPageComponent } from './index-page/index-page.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    component: IndexPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'transactionList',
        pathMatch: 'full'
      },
      {
        path: 'transactionList',
        component: TransactionListComponent,
        canActivate: [AuthGuard],
        resolve: {
          transactionList: TransactionListResolver
        }
      },
      {
        path: 'userPayment',
        component: UserPaymentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        canActivate: [AuthGuard],
        resolve: {
          accountDetails: AccountDetailsResolver,
          status: StatusResolver
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
