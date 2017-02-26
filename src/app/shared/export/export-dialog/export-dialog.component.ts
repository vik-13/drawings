import {Component} from "@angular/core";

@Component({
  selector: 'export-dialog',
  templateUrl: './export-dialog.html',
  styleUrls: ['./export-dialog.scss']
})
export class ExportDialogComponent {
  jsonData: string = '';
}
