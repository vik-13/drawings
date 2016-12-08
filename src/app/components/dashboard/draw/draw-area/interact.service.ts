import {Injectable} from "@angular/core";
import {MouseService} from "./mouse.service";
@Injectable()
export class InteractService {
    actives: Array<any> = [];
    mouse: any;

    constructor(public mouseService: MouseService) {
        this.mouse = mouseService.position;
    }

    clean() {
        this.actives.length = 0;
    }

    dot(dot, key) {
        let isFound = false;
        if (Math.sqrt(Math.pow(dot.x - this.mouse.x, 2) + Math.pow(dot.y - this.mouse.y, 2)) <= 8) {
            isFound = true;
            this.actives.push({index: key, dot: dot});
        }
        return isFound;
    }

    line(from, to, fromKey, toKey, context, path) {
        let isFound = false;
        if (context.isPointInPath(path, this.mouse.x, this.mouse.y)) {
            isFound = true;
            this.actives.push({index: fromKey, dot: from});
            this.actives.push({index: toKey, dot: to});
        }
        return isFound;
    }

    getActives() {
        return this.actives;
    }
}
