import {NgModule} from '@angular/core';

import {
  MdListModule,
  MdCheckboxModule, MdButtonModule, MdIconModule, MdMenuModule, MdInputModule
} from '@angular/material';

import {DrawComponent} from './draw.component';
import {CommonModule} from "@angular/common";
import {DrawService} from "./draw.service";
import {DrawAreaComponent} from "./draw-area/draw-area.component";
import {DrawAreaModule} from "./draw-area/draw-area.module";
import {LayoutsComponent} from "./layouts/layouts.component";
import {AddLayoutComponent} from "./layouts/add-layout/add-layout.component";
import {FocusDirective} from "../../shared/focus/focus.directive";

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdCheckboxModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdInputModule,

    DrawAreaModule
  ],
  declarations: [
    DrawComponent,
    DrawAreaComponent,
    LayoutsComponent,
    AddLayoutComponent,

    FocusDirective
  ],
  providers: [
    DrawService
  ]
})
export class DrawModule {
}
