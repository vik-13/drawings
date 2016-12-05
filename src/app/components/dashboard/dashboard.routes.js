"use strict";
var dashboard_auth_1 = require('./dashboard.auth');
var dashboard_component_1 = require('./dashboard.component');
var draw_component_1 = require("./draw/draw.component");
exports.DashboardRoutes = [{
        path: '',
        canActivate: [dashboard_auth_1.DashboardAuth],
        children: [
            { path: '', component: dashboard_component_1.DashboardComponent },
            { path: 'draw', component: draw_component_1.DrawComponent }
        ]
    }];
//# sourceMappingURL=dashboard.routes.js.map