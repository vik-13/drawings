import {Component, Input} from "@angular/core";

@Component({
    selector: 'preview',
    templateUrl: './preview.html',
    styleUrls: ['./preview.scss']
})

export class PreviewComponent {
    @Input() drawing: any;

    layouts: Array<any> = [];

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
