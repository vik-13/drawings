import {Injectable} from "@angular/core";
import {LayoutsService} from "./layouts.service";
import {MouseService} from "./mouse.service";
import {InteractService} from "./interact.service";
@Injectable()
export class PaintService {
    mouse: any;
    tool: string = 'line';
    movement: any = {
        isActive : false,
        index: -1
    };

    constructor(public layoutsService: LayoutsService, public mouseService: MouseService, public interactService: InteractService) {
        this.mouse = mouseService.position;
    }

    split(from) {
        this.layoutsService.pushAfterIndex(from.index, this.mouse.x, this.mouse.y);
    }

    down() {
        let actives = this.interactService.getActives();

        if (actives.length == 1) {
            switch (this.tool) {
                case 'move':
                    this.movement.isActive = true;
                    this.movement.index = actives[0].index;
                    return;
                default:
                    return;
            }
        }
    }

    move() {
        if (this.movement.isActive) {
            this.layoutsService.move(this.mouse.x, this.mouse.y, this.movement.index);
        }
    }

    up() {
        let actives = this.interactService.getActives();

        switch (this.tool) {
            case 'move':
                this.movement.isActive = false;
                this.movement.index = -1;
                return;
            case 'line':
                this.layoutsService.push(this.mouse.x, this.mouse.y);
                return;
            case 'split':
                if (actives.length == 2) {
                    this.split(actives[0]);
                }
                return;
            case 'remove':
                this.layoutsService.removeDot(actives[0].index);
                return;
            default:
                return;
        }
    }
}
