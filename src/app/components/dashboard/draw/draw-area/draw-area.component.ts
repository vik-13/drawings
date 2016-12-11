import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {DrawAreaService} from "./draw-area.service";

@Component({
    selector: 'draw-area',
    templateUrl: './draw-area.html',
    styleUrls: ['./draw-area.scss']
})

export class DrawAreaComponent {
    userId: string;
    drawingId: string;
    mouse: any = {
        x: 0,
        y: 0
    };

    move: any = {
        last: {
            x: 0,
            y: 0
        },
        isLayout: false,
        active: false,
        dot: false
    };

    selectedLayout: string = '';
    size: any = {
        width: 0,
        height: 0
    };

    drawing: FirebaseObjectObservable<any>;
    layoutsObservable: FirebaseListObservable<any>;

    drawingSubscribe: any;
    layoutsSubscribe: any;
    sharedSubscribe: any;

    layouts: Array<any> = [];

    constructor(public af: AngularFire,
                public activatedRoute: ActivatedRoute,
                public authService: AuthService, public drawAreaService: DrawAreaService) {

        activatedRoute.params.subscribe((params) => {
            let id = params['id'];
            if (params['shared']) {
                this.sharedSubscribe = af.database.object('/shared/' + id, {preserveSnapshot: true}).subscribe((snapshot) => {
                    let shared = snapshot.val();
                    this.userId = shared.ownerId;
                    this.drawingId = shared.drawingId;
                    this.connect();
                    this.sharedSubscribe.unsubscribe();
                });
            } else {
                this.userId = this.authService.get();
                this.drawingId = id;
                this.connect();
            }
        });
    }

    connect() {
        this.drawAreaService.init(this.userId, this.drawingId);

        this.drawing = this.af.database.object('/users/' + this.userId + '/drawings/' + this.drawingId, {preserveSnapshot: true});
        this.drawingSubscribe = this.drawing.subscribe(snapshot => {
            let drawing = snapshot.val();
            this.selectedLayout = drawing ? drawing.selectedLayout : '';
            this.size.width = drawing ? drawing.width : 0;
            this.size.height = drawing ? drawing.height : 0;
            this.drawAreaService.setLayout(this.selectedLayout);
        });

        this.layoutsObservable = this.af.database.list('/users/' + this.userId + '/drawings/' + this.drawingId + '/layouts', {preserveSnapshot: true});
        this.layoutsSubscribe = this.layoutsObservable.subscribe(snapshots => {
            this.layouts.length = 0;
            snapshots.forEach(snapshot => {
                let value = snapshot.val(), dot, i, next,
                    layout = {
                        key: snapshot.key,
                        name: value.name,
                        visibility: value.visibility,
                        dots: [],
                        lines: []
                    };
                for (dot in value.dots) {
                    if (value.dots.hasOwnProperty(dot)) {
                        layout.dots.push({
                            key: dot,
                            x: value.dots[dot].x,
                            y: value.dots[dot].y
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
            });
        });
    }

    clickOnDot(event, dot, layout) {
        event.preventDefault();
        event.stopPropagation();
        if (event.button == 0) {
            if (layout == this.selectedLayout) {
                this.move.isLayout = false;
                this.move.active = true;
                this.move.dot = dot;
            }
        } else {
            this.drawAreaService.removeDot(dot.key);
        }
    }

    mouseDown(event) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
        if (event.button == 0) {
            if (this.selectedLayout) {
                this.drawAreaService.addDot(this.mouse.x, this.mouse.y);
            }
        } else {
            this.move.last.x = this.mouse.x;
            this.move.last.y = this.mouse.y;
            this.move.isLayout = true;
            this.move.active = true;
        }
    }

    mouseMove(event) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
        if (this.move.active) {
            if (!this.move.isLayout) {
                this.drawAreaService.updateDot(this.move.dot.key, this.mouse.x, this.mouse.y);
            } else {
                this.drawAreaService.updateDots(this.layouts, this.mouse.x - this.move.last.x, this.mouse.y - this.move.last.y);
                this.move.last.x = this.mouse.x;
                this.move.last.y = this.mouse.y;
            }
        }
    }

    mouseUp(event) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
        if (this.move.active) {
            this.move.active = false;
            this.move.isLayout = false;
        }
    }

    ngOnDestroy() {
        this.drawingSubscribe.unsubscribe();
        this.layoutsSubscribe.unsubscribe();
    }
}
