import {NgModule} from '@angular/core';

import {
  MdListModule,
  MdCheckboxModule, MdButtonModule, MdIconModule
} from '@angular/material';

import {DrawComponent} from './draw.component';
import {CommonModule} from "@angular/common";
import {DrawService} from "./draw.service";
import {DrawAreaComponent} from "./draw-area/draw-area.component";
import {DrawAreaModule} from "./draw-area/draw-area.module";
import {LayoutsComponent} from "./layouts/layouts.component";

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdCheckboxModule,
    MdButtonModule,
    MdIconModule,

    DrawAreaModule
  ],
  declarations: [
    DrawComponent,
    DrawAreaComponent,
    LayoutsComponent
  ],
  providers: [
    DrawService
  ]
})
export class DrawModule {
}
