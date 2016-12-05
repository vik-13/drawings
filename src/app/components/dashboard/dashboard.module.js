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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var material_1 = require('@angular/material');
var dashboard_auth_1 = require('./dashboard.auth');
var dashboard_component_1 = require('./dashboard.component');
var draw_module_1 = require("./draw/draw.module");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                draw_module_1.DrawModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                router_1.RouterModule,
                material_1.MdCardModule,
                material_1.MdToolbarModule,
                material_1.MdIconModule,
                material_1.MdButtonModule,
                material_1.MdSidenavModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent
            ],
            providers: [
                dashboard_auth_1.DashboardAuth
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map