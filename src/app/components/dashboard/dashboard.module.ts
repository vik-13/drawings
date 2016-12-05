import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdSidenavModule
} from '@angular/material';

import {DashboardAuth} from './dashboard.auth';
import {DashboardComponent} from './dashboard.component';
import {DrawModule} from "./draw/draw.module";

@NgModule({
    imports: [
        DrawModule,
        FormsModule,
        CommonModule,
        RouterModule,
        MdCardModule,
        MdToolbarModule,
        MdIconModule,
        MdButtonModule,
        MdSidenavModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardAuth
    ]
})
export class DashboardModule { }