import {NgModule} from "@angular/core";
import {ExportService} from "./export.service";
import {MdDialogModule} from "@angular/material";
import {ExportDialogComponent} from "./export-dialog/export-dialog.component";

@NgModule({
  imports: [
    MdDialogModule
  ],
  declarations: [
    ExportDialogComponent
  ],
  entryComponents: [
    ExportDialogComponent
  ],
  providers: [
    ExportService
  ]
})
export class ExportModule {}
