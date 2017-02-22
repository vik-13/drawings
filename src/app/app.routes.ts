import {Routes} from '@angular/router';

import {AccountRoutes} from './components/account/account.routes';
import {DashboardRoutes} from './components/dashboard/dashboard.routes';

export const appRoutes: Routes = [
    ...AccountRoutes,
    ...DashboardRoutes
];
