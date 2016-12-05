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
var auth_service_1 = require("../../auth/auth.service");
var router_1 = require("@angular/router");
var angularfire2_1 = require('angularfire2');
var DashboardComponent = (function () {
    function DashboardComponent(authService, af, router) {
        this.authService = authService;
        this.af = af;
        this.router = router;
        this.files = af.database.list('/files');
    }
    DashboardComponent.prototype.add = function () {
        this.files.push({ name: 'Untitled file...', id: 'file_id' });
    };
    DashboardComponent.prototype.signOut = function () {
        this.authService.unAuth();
        //TODO: Should be redirected to sign-in!!!
        this.router.navigate(['/account/sign-in']);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.html',
            styleUrls: ['dashboard.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, angularfire2_1.AngularFire, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map