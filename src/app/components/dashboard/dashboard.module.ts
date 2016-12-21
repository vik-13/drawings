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
    MdDialogModule, MdInputModule, MdSnackBarModule, MdSlideToggleModule
} from '@angular/material';

import {DashboardAuth} from './dashboard.auth';
import {DashboardComponent} from './dashboard.component';
import {DrawModule} from "./draw/draw.module";
import {DrawingItemComponent} from "./drawing-item/drawing-item.component";
import {SharedDrawingItemComponent} from "./shared-drawing-item/shared-drawing-item.component";
import {AddDrawingComponent} from "./add-drawing/add-drawing.component";
import {PreviewComponent} from "../../shared/preview/preview.component";

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
        MdSnackBarModule,
        MdSlideToggleModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent,
        AddDrawingComponent,
        DrawingItemComponent,
        SharedDrawingItemComponent,
        PreviewComponent
    ],
    providers: [
        DashboardAuth
    ]
})
export class DashboardModule { }
