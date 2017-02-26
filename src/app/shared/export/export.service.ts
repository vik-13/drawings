import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";
import {MdDialog} from "@angular/material";
import {ExportDialogComponent} from "./export-dialog/export-dialog.component";

@Injectable()
export class ExportService {
  exportData: any = {};

  drawingSubscribed: any;

  constructor(private af: AngularFire, private dialog: MdDialog) {

  }

  show(drawingId) {
    this.drawingSubscribed = this.af.database.object('/drawings/' + drawingId).subscribe((snapshot) => {
      this.prepare(snapshot);

      let dialogRef = this.dialog.open(ExportDialogComponent);
      dialogRef.componentInstance.jsonData = JSON.stringify(this.exportData);

      setTimeout(() => this.drawingSubscribed.unsubscribe());
    });
  }

  prepare(data) {
    this.exportData.name = data.name;
    this.exportData.layouts = [];

    if (data.layouts) {
      let exportedLayout;
      for (let layout in data.layouts) {
        if (data.layouts[layout].visibility) {
          exportedLayout = {};
          exportedLayout.name = data.layouts[layout].name;
          exportedLayout.endless = data.layouts[layout].closed;
          exportedLayout.dots = [];

          if (data.layouts[layout].dots) {
            let dot;
            for (dot in data.layouts[layout].dots) {
              exportedLayout.dots.push({
                x: data.layouts[layout].dots[dot].x,
                y: data.layouts[layout].dots[dot].y
              });
            }
          }
          this.exportData.layouts.push(exportedLayout);
        }
      }
    }
  }

}
