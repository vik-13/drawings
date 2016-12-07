import {NgModule} from '@angular/core';

import {DrawComponent} from './draw.component';
import {LayoutsComponent} from "./layouts/layouts.component";
import {ToolsComponent} from "./tools/tools.component";
import {CommonModule} from "@angular/common";
import {DrawService} from "./draw.service";
import {DrawAreaComponent} from "./draw-area/draw-area.component";
import {DrawAreaModule} from "./draw-area/draw-area.module";

@NgModule({
    imports: [
        CommonModule,
        DrawAreaModule
    ],
    declarations: [
        DrawComponent,
        DrawAreaComponent,
        LayoutsComponent,
        ToolsComponent
    ],
    providers: [
        DrawService
    ]
})
export class DrawModule { }
