import {Routes} from '@angular/router';

import {AccountComponent} from "./account.component";

import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AccountAuth} from "./account.auth";

export const AccountRoutes: Routes = [{
    path: 'account',
    component: AccountComponent,
    canActivate: [AccountAuth],
    children: [
        {path: 'sign-in', component: SignInComponent},
        {path: 'sign-up', component: SignUpComponent}
    ]
}];
