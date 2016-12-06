import {NgModule} from '@angular/core';

import {DrawComponent} from './draw.component';
import {LayoutsComponent} from "./layouts/layouts.component";
import {ToolsComponent} from "./tools/tools.component";

@NgModule({
    declarations: [
        DrawComponent,
        LayoutsComponent,
        ToolsComponent
    ]
})
export class DrawModule { }
