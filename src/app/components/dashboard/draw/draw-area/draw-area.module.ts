import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PaintService} from "./paint.service";
import {InteractService} from "./interact.service";
import {MouseService} from "./mouse.service";
import {LayoutsService} from "./layouts.service";
import {RenderService} from "./render.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        PaintService,
        InteractService,
        MouseService,
        LayoutsService,
        RenderService
    ]
})
export class DrawAreaModule { }
