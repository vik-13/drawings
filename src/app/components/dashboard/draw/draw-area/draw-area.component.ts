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
    fileId: string;
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

    tool: string = '';
    selectedLayout: string = '';

    file: FirebaseObjectObservable<any>;
    layoutsObservable: FirebaseListObservable<any>;

    layouts: Array<any> = [];

    constructor(public af: AngularFire,
                public activatedRoute: ActivatedRoute,
                public authService: AuthService, public drawAreaService: DrawAreaService) {
        this.userId = this.authService.get();
        activatedRoute.params.subscribe((params) => {
            this.fileId = params['id'];
            this.drawAreaService.init(this.userId, this.fileId);

            this.file = af.database.object('/' + this.userId + '/drawings/' + this.fileId, {preserveSnapshot: true});
            this.file.subscribe(snapshot => {
                this.selectedLayout = snapshot.val().selectedLayout;
                this.tool = snapshot.val().tool;
                this.drawAreaService.setLayout(this.selectedLayout);
            });

            this.layoutsObservable = af.database.list('/' + this.userId + '/drawings/' + this.fileId + '/layouts', {preserveSnapshot: true});
            this.layoutsObservable.subscribe(snapshots => {
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
            this.drawAreaService.addDot(this.mouse.x, this.mouse.y);
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
}
