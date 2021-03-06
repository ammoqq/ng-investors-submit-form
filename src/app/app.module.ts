///<reference path="user-payment/user-payment.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';
import { StatusResolver } from './status/status.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// import { AngularFireStorage } from 'angularfire2/storage';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatSelectModule,
  MatExpansionModule,
  MatIconModule,
  MatGridListModule,
  MatStepperModule,
  MatProgressBarModule,
  MatDialogModule,
  MatRadioModule,
  MatTabsModule,
  MatSidenavModule,
  MatTableModule,
  MatListModule

} from '@angular/material';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ShareService } from './share.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ResetPwComponent } from './reset-pw/reset-pw.component';
import { ResendComponent } from './resend/resend.component';
import { AccountDetailsResolver } from './account-details/account-details.resolver';
import { AnonymousGuard } from './core/anonymous.guard';
import { PayuService } from './user-payment/payu.service';
import { HttpClientModule } from '@angular/common/http';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionListResolver } from './transaction-list/transaction-list.resolver';
import { ImageDialogComponent} from './shared/image-dialog/image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent,
    RegisterComponent,
    IndexComponent,
    AccountDetailsComponent,
    CreateComponent,
    UserPaymentComponent,
    IndexPageComponent,
    ResetPwComponent,
    ResendComponent,
    TransactionListComponent,
    ImageDialogComponent
  ],
  imports: [
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatStepperModule,
    MatExpansionModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false, enableTracing: true }),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  entryComponents: [ImageDialogComponent],
  providers: [AuthService, UserService, StatusResolver, AuthGuard, ShareService, AccountDetailsResolver, AnonymousGuard, PayuService, TransactionListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
