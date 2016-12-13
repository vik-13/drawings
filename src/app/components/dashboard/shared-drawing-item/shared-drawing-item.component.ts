import {Component, Input} from "@angular/core";
import {AngularFire} from "angularfire2";

@Component({
    selector: 'shared-drawing-item',
    templateUrl: './shared-drawing-item.html'
})

export class SharedDrawingItemComponent {
    @Input() shared: any;

    userName: any;
    drawing: any = {};

    sharedKey: string;

    userSubscriber: any;
    drawingSubscriber: any;

    layouts: Array<any> = [];

    constructor(public af: AngularFire) {

    }

    ngOnChanges(changes: any) {
        this.sharedKey = this.shared.$key;
        this.userSubscriber = this.af.database.object('/users/' + this.shared.ownerId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.userName = snapshot.val().name;
        });
        this.drawingSubscriber = this.af.database.object('/users/' + this.shared.ownerId + '/drawings/' + this.shared.drawingId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.drawing = snapshot.val();
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
                            layout.lines.push({
                                x1: layout.dots[i].x,
                                y1: layout.dots[i].y,
                                x2: next.x,
                                y2: next.y
                            });
                        }
                    }

                    this.layouts.push(layout);
                }
            }
        });
    }

    ngOnDestroy() {
        this.userSubscriber.unsubscribe();
        this.drawingSubscriber.unsubscribe();
    }
}
