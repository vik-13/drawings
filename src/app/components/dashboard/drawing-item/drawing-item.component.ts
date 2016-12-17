import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AngularFire} from "angularfire2";

@Component({
    selector: 'drawing-item',
    templateUrl: './drawing-item.html'
})

export class DrawingItemComponent {
    @Input() drawingLink: any;

    @Output() onRemove = new EventEmitter<any>();
    @Output() onShare = new EventEmitter<string>();
    @Output() onUnShare = new EventEmitter<any>();

    drawingKey: string = '';
    drawing: any = {};
    drawingSubscriber: any;

    constructor(public af: AngularFire) {}

    remove(event) {
        event.stopPropagation();
        this.onRemove.emit({
            key: this.drawingKey,
            sharedKey: this.drawing.shared
        });
    }

    share(event) {
        event.stopPropagation();
        this.onShare.emit(this.drawingKey);
    }

    unShare(event) {
        event.stopPropagation();
        this.onUnShare.emit({
            key: this.drawingKey,
            sharedKey: this.drawing.shared
        });
    }

    ngOnChanges() {
        this.drawingSubscriber = this.af.database.object('/drawings/' + this.drawingLink.id, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.drawingKey = snapshot.key;
            this.drawing = snapshot.val();
        });
    }

    ngOnDestroy() {
        this.drawingSubscriber.unsubscribe();
    }
}
