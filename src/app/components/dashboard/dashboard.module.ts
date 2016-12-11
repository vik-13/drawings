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
import {DrawingItemComponent} from "./drawing-item/drawing-item.component";
import {SharedDrawingItemComponent} from "./shared-drawing-item/shared-drawing-item.component";

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
        DashboardComponent,
        DrawingItemComponent,
        SharedDrawingItemComponent
    ],
    providers: [
        DashboardAuth
    ]
})
export class DashboardModule { }
