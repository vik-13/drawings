import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
  MdSnackBarModule
} from '@angular/material';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    MdSnackBarModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AccountModule {}
