import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';
import { StatusResolver } from './status/status.resolver';
import { AuthGuard } from './core/auth.guard';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'status', pathMatch: 'full'},
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard],  resolve: { data: StatusResolver} },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard]  },
      { path: 'account-details', component: AccountDetailsComponent, canActivate: [AuthGuard], resolve: { data: StatusResolver}}
    ]
  }
];
