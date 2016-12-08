import {Routes} from '@angular/router';

import {DashboardAuth} from './dashboard.auth';
import {DashboardComponent} from './dashboard.component';
import {DrawComponent} from "./draw/draw.component";

export const DashboardRoutes: Routes = [{
    path: '',
    canActivate: [ DashboardAuth ],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'draw/:id', component: DrawComponent}
    ]
}];
