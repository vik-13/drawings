"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var material_1 = require('@angular/material');
var account_auth_1 = require('./account.auth');
var account_component_1 = require('./account.component');
var sign_in_component_1 = require('./sign-in/sign-in.component');
var sign_up_component_1 = require('./sign-up/sign-up.component');
var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule,
                forms_1.FormsModule,
                material_1.MdCardModule,
                material_1.MdButtonModule,
                material_1.MdInputModule
            ],
            declarations: [
                account_component_1.AccountComponent,
                sign_in_component_1.SignInComponent,
                sign_up_component_1.SignUpComponent
            ],
            providers: [
                account_auth_1.AccountAuth
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map