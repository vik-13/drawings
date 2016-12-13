import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
    MdSnackBarModule
} from '@angular/material';

import {AccountAuth} from './account.auth';
import {AccountComponent} from './account.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        MdSnackBarModule
    ],
    declarations: [
        AccountComponent,
        SignInComponent,
        SignUpComponent
    ],
    providers: [
        AccountAuth
    ]
})
export class AccountModule { }
