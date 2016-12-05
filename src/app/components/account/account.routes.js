"use strict";
var account_component_1 = require("./account.component");
var sign_in_component_1 = require("./sign-in/sign-in.component");
var sign_up_component_1 = require("./sign-up/sign-up.component");
var account_auth_1 = require("./account.auth");
exports.AccountRoutes = [{
        path: 'account',
        component: account_component_1.AccountComponent,
        canActivate: [account_auth_1.AccountAuth],
        children: [
            { path: 'sign-in', component: sign_in_component_1.SignInComponent },
            { path: 'sign-up', component: sign_up_component_1.SignUpComponent }
        ]
    }];
//# sourceMappingURL=account.routes.js.map