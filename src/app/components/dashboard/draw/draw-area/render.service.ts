import {Injectable} from "@angular/core";
import {InteractService} from "./interact.service";
import {AngularFire} from "angularfire2";
import {LayoutService} from "./layout.service";
@Injectable()
export class RenderService {
    canvas: any;
    context: any;
    snapshots: any;

    //TODO: Should be moved to firebase...
    tool: string = 'line';

    constructor(public af: AngularFire, public interactService: InteractService, public layoutService: LayoutService) {
        af.database.list('/layouts', {preserveSnapshot: true}).subscribe((snapshots) => {
            console.log('layouts are updated... render service...');
            this.snapshots = snapshots;
            this.update();
        });
    }

    init() {
        this.canvas = document.getElementById('draw-area');
        this.context = this.canvas.getContext('2d');
    }

    update() {
        this.clean();

        this.renderLayouts();
        this.drawActives(this.interactService.getActives());
    }

    clean() {
        this.interactService.clean();

        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    renderLayouts() {
        this.snapshots.forEach(snapshot => {
            this.renderLayout(snapshot.val(), snapshot.key == this.layoutService.layoutId);
        });
    }

    private calculateRectCoords(from, to) {
        let a, b, c, m, m2, rect = [],
            d = 1;

        a = to.y - from.y;
        b = from.x - to.x;
        c = (to.x * from.y) - (from.x * to.y);

        if (a == 0) {
            rect.push({x: from.x, y: from.y - (d / 2)});
            rect.push({x: from.x, y: from.y + (d / 2)});
            rect.push({x: to.x, y: to.y + (d / 2)});
            rect.push({x: to.x, y: to.y - (d / 2)});
        } else if (b == 0) {
            rect.push({x: from.x - (d / 2), y: from.y});
            rect.push({x: from.x + (d / 2), y: from.y});
            rect.push({x: to.x + (d / 2), y: to.y});
            rect.push({x: to.x - (d / 2), y: to.y});
        } else {
            m = - a / b;
            m2 = -1 / m;

            rect.push({
                x: (d / 2) / Math.sqrt(1 + Math.pow(m2, 2)) + from.x,
                y: (m2 * (d / 2)) / Math.sqrt(1 + Math.pow(m2, 2)) + from.y
            });

            rect.push({
                x: - (d / 2) / Math.sqrt(1 + Math.pow(m2, 2)) + from.x,
                y: - (m2 * (d / 2)) / Math.sqrt(1 + Math.pow(m2, 2)) + from.y
            });

            rect.push({
                x: - (d / 2) / Math.sqrt(1 + Math.pow(m2, 2)) + to.x,
                y: - (m2 * (d / 2)) / Math.sqrt(1 + Math.pow(m2, 2)) + to.y
            });

            rect.push({
                x: (d / 2) / Math.sqrt(1 + Math.pow(m2, 2)) + to.x,
                y: (m2 * (d / 2)) / Math.sqrt(1 + Math.pow(m2, 2)) + to.y
            });
        }

        return rect;
    }

    renderLine(from, to, fromKey, toKey, interaction) {
        let path = new Path2D();
        let rect = this.calculateRectCoords(from, to);

        rect.forEach((dot, index) => {
            if (!index) {
                path.moveTo(dot.x, dot.y);
            } else {
                path.lineTo(dot.x, dot.y);
            }
        });
        path.lineTo(rect[0].x, rect[0].y);

        this.context.fillStyle = interaction ? '#005500' : '#330000';

        path.closePath();

        if (interaction) {
            if (this.tool == 'split') {
                this.interactService.line(from, to, fromKey, toKey, this.context, path);
            } else if (this.tool == 'move' || this.tool == 'remove') {
                this.interactService.dot(to, toKey);
            }
        }

        this.context.fill(path);
    }

    renderLayout(layout, interaction) {
        let item, prev, index = 0;
        this.context.save();
        for (item in layout.dots) {
            if (layout.dots.hasOwnProperty(item)) {
                if (index) {
                    this.renderLine(layout.dots[prev], layout.dots[item], prev, item, interaction);
                }
                prev = item;
                index++;
            }
        }
        // if (layout.endless) {
        //     this.renderLine(layout.dots[layout.dots.length - 1], layout.dots[0], layout.dots.length, interaction);
        // }
        this.context.restore();
    }

    drawActives(actives) {
        actives.forEach((active) => {
            this.drawDotCircle(active.dot);
        });
    }

    drawDotCircle(position) {
        this.context.save();
        this.context.beginPath();

        this.context.arc(position.x, position.y, 8, 0, Math.PI * 2);

        this.context.strokeStyle = '#330000';
        this.context.lineWidth = 1;
        this.context.lineJoin = 'miter';
        this.context.stroke();
        this.context.restore();
    }
}
