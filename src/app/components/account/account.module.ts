import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
  MdSnackBarModule, MdButtonModule, MdInputModule, MdCardModule
} from '@angular/material';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,

    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdSnackBarModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AccountModule {}
