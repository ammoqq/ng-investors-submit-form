import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';
import { StatusResolver } from './status/status.resolver';
import { AuthGuard } from './core/auth.guard';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import {UserPaymentComponent} from './user-payment/user-payment.component';
import {AdminIndexComponent} from './admin-index/admin-index.component';
import {AdminPaymentComponent} from './admin-payment/admin-payment.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminIndexComponent },
  { path: 'adminIndex',
    component: AdminIndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'adminPayment', pathMatch: 'full'},
      { path: 'adminPayment', component: AdminPaymentComponent, canActivate: [AuthGuard]  }
    ]
  },
  { path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'userPayment', pathMatch: 'full'},
      { path: 'userPayment', component: UserPaymentComponent, canActivate: [AuthGuard]  },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard],  resolve: { data: StatusResolver} },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard]  },
    ]
  }
];
