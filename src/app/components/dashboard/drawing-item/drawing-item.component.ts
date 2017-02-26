import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AngularFire} from "angularfire2";
import {ExportService} from "../../../shared/export/export.service";

@Component({
  selector: 'drawing-item',
  templateUrl: './drawing-item.html',
  styleUrls: ['./drawing-item.scss']
})

export class DrawingItemComponent {
  @Input() drawingLink: any;

  @Output() onRemove = new EventEmitter<any>();
  @Output() onShare = new EventEmitter<string>();
  @Output() onUnShare = new EventEmitter<any>();

  drawing: any = {};
  drawingSubscriber: any;

  constructor(private af: AngularFire, private exportService: ExportService) {
  }

  exportData(event) {
    event.stopPropagation();
    this.exportService.show(this.drawingLink.id);
  }

  remove(event) {
    event.stopPropagation();
    this.onRemove.emit({
      key: this.drawingLink.id,
      linkKey: this.drawingLink.$key,
      sharedKey: this.drawing.shared
    });
  }

  share(event) {
    event.stopPropagation();
    this.onShare.emit(this.drawingLink.id);
  }

  unShare(event) {
    event.stopPropagation();
    this.onUnShare.emit({
      key: this.drawingLink.id,
      sharedKey: this.drawing.shared
    });
  }

  ngOnChanges() {
    this.drawingSubscriber = this.af.database.object('/drawings/' + this.drawingLink.id, {preserveSnapshot: true}).subscribe((snapshot) => {
      this.drawing = snapshot.val();
    });
  }

  ngOnDestroy() {
    this.drawingSubscriber.unsubscribe();
  }
}
