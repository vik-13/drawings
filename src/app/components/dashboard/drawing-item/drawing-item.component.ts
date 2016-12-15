import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'drawing-item',
    templateUrl: './drawing-item.html'
})

export class DrawingItemComponent {
    @Input() drawing: any;

    @Output() onRemove = new EventEmitter<any>();
    @Output() onShare = new EventEmitter<string>();
    @Output() onUnShare = new EventEmitter<any>();

    remove(event) {
        event.stopPropagation();
        this.onRemove.emit(this.drawing);
    }

    share(event) {
        event.stopPropagation();
        this.onShare.emit(this.drawing.$key);
    }

    unShare(event) {
        event.stopPropagation();
        this.onUnShare.emit(this.drawing);
    }
}
