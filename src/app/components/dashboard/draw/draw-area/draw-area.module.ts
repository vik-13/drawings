import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PaintService} from "./paint.service";
import {InteractService} from "./interact.service";
import {MouseService} from "./mouse.service";
import {LayoutService} from "./layout.service";
import {RenderService} from "./render.service";
import {DrawAreaService} from "./draw-area.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        DrawAreaService,
        PaintService,
        InteractService,
        MouseService,
        LayoutService,
        RenderService
    ]
})
export class DrawAreaModule { }
