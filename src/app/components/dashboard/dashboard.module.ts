import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdSidenavModule,
    MdDialogModule, MdInputModule
} from '@angular/material';

import {DashboardAuth} from './dashboard.auth';
import {DashboardComponent} from './dashboard.component';
import {DrawModule} from "./draw/draw.module";
import {DrawingItemComponent} from "./drawing-item/drawing-item.component";
import {SharedDrawingItemComponent} from "./shared-drawing-item/shared-drawing-item.component";
import {DrawingDialogComponent} from "./drawing-dialog/drawing-dialog.component";

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
        MdInputModule,
        MdSidenavModule,
        MdDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent,
        DrawingItemComponent,
        SharedDrawingItemComponent,
        DrawingDialogComponent
    ],
    providers: [
        DashboardAuth
    ],
    entryComponents: [
        DrawingDialogComponent
    ]
})
export class DashboardModule { }
