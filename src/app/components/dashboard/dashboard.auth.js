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
var angularfire2_1 = require('angularfire2');
var router_1 = require('@angular/router');
var DashboardAuth = (function () {
    function DashboardAuth(af, router) {
        this.af = af;
        this.router = router;
    }
    DashboardAuth.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.af.auth.map(function (auth) {
            if (auth == null) {
                _this.router.navigate(['/account/sign-in']);
                return false;
            }
            else {
                return true;
            }
        }).first();
    };
    DashboardAuth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.Router])
    ], DashboardAuth);
    return DashboardAuth;
}());
exports.DashboardAuth = DashboardAuth;
//# sourceMappingURL=dashboard.auth.js.map