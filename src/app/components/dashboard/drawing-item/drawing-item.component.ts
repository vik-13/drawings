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

    layouts: Array<any> = [];

    constructor() {

    }

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

    ngOnChanges() {
        let dirtyLayoutKey, dirtyLayout;
        this.layouts.length = 0;

        for (dirtyLayoutKey in this.drawing.layouts) {
            if (this.drawing.layouts.hasOwnProperty(dirtyLayoutKey)) {
                dirtyLayout = this.drawing.layouts[dirtyLayoutKey];
                let dot, i, next,
                    layout = {
                        key: dirtyLayoutKey,
                        name: dirtyLayout.name,
                        visibility: dirtyLayout.visibility,
                        closed: dirtyLayout.closed,
                        dots: [],
                        lines: []
                    };
                for (dot in dirtyLayout.dots) {
                    if (dirtyLayout.dots.hasOwnProperty(dot)) {
                        layout.dots.push({
                            key: dot,
                            x: dirtyLayout.dots[dot].x,
                            y: dirtyLayout.dots[dot].y
                        });
                    }
                }

                if (layout.dots.length > 1) {
                    for (i = 0; i < layout.dots.length; i++) {
                        next = (i == layout.dots.length - 1) ? layout.dots[0] : layout.dots[i + 1];
                        if ((i != layout.dots.length - 1) || layout.closed) {
                            layout.lines.push({
                                x1: layout.dots[i].x,
                                y1: layout.dots[i].y,
                                x2: next.x,
                                y2: next.y
                            });
                        }
                    }
                }

                this.layouts.push(layout);
            }
        }
    }
}
