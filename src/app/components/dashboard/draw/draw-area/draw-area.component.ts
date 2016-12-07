import {Component} from "@angular/core";
import {PaintService} from "./paint.service";
import {MouseService} from "./mouse.service";
import {LayoutsService} from "./layouts.service";
import {RenderService} from "./render.service";

@Component({
    selector: 'draw-area',
    templateUrl: './draw-area.html',
    styleUrls: ['./draw-area.scss']
})

export class DrawAreaComponent {

    constructor(public paintService: PaintService, public mouseService: MouseService, public renderService: RenderService) {}

    updateMouse(event) {
        this.mouseService.position.x = event.clientX - event.currentTarget.offsetLeft - event.currentTarget.offsetParent.offsetLeft;
        this.mouseService.position.y = event.clientY - event.currentTarget.offsetTop - event.currentTarget.offsetParent.offsetTop;
    }

    mouseDown(event) {
        this.updateMouse(event);
        this.paintService.down();
    }

    mouseMove(event) {
        this.updateMouse(event);
        this.paintService.move();
    }

    mouseUp(event) {
        this.updateMouse(event);
        this.paintService.up();
    }

    ngAfterViewInit() {
        this.renderService.init();
    }
}