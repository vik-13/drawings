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
var router_1 = require('@angular/router');
var auth_service_1 = require('../../../auth/auth.service');
var SignInComponent = (function () {
    function SignInComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.data = {
            email: '',
            password: ''
        };
    }
    SignInComponent.prototype.signIn = function (event) {
        var _this = this;
        event.preventDefault();
        this.authService.auth(this.data).then(function () {
            _this.router.navigate(['/']);
        }).catch(function (response) {
            console.log(response);
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sign-in',
            templateUrl: 'sign-in.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map