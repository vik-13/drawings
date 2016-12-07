import {Injectable} from "@angular/core";
import {InteractService} from "./interact.service";
import {PaintService} from "./paint.service";
import {AngularFire} from "angularfire2";
@Injectable()
export class RenderService {
    canvas: any;
    context: any;

    constructor(public af: AngularFire, public interactService: InteractService, public paintService: PaintService) {
        af.database.list('/layouts', {preserveSnapshot: true}).subscribe((snapshots) => {
            this.clean();
            snapshots.forEach(snapshot => {
                this.renderLayout(snapshot.val(), false);
            });
        });
    }

    init() {
        this.canvas = document.getElementById('draw-area');
        this.context = this.canvas.getContext('2d');
    }

    update() {
        this.renderLayouts();
        this.drawActives(this.interactService.getActives());
    }

    clean() {
        this.interactService.clean();

        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    renderLayouts() {
        let layouts = [];
        layouts.forEach((layout) => {
            if (layout.dots && layout.dots.length >= 1 && layout.visibility) {
                this.renderLayout(layout, false);
            }
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

    renderLine(from, to, index, interaction) {
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
            if (this.paintService.tool == 'split') {
                this.interactService.line(from, to, index, this.context, path);
            } else if (this.paintService.tool == 'move' || this.paintService.tool == 'remove') {
                this.interactService.dot(to, index);
            }
        }

        this.context.fill(path);
    }

    renderLayout(layout, interaction) {
        this.context.save();
        if (layout.dots.length == 1) {
            this.drawDotCircle(layout.dots[0]);
        } else {
            layout.dots.forEach((to, index) => {
                if (index) {
                    let from = layout.dots[index - 1];
                    this.renderLine(from, to, index, interaction);
                }
            });
            if (layout.endless) {
                this.renderLine(layout.dots[layout.dots.length - 1], layout.dots[0], layout.dots.length, interaction);
            }
        }
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
