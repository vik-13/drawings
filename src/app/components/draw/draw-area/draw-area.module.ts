import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DrawAreaService} from "./draw-area.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DrawAreaService
  ]
})
export class DrawAreaModule {
}
