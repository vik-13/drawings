export default class Interact {
    actives: Array<any>;
    mouse: any;

    constructor(Mouse) {
        this.actives = [];
        this.mouse = Mouse;
    }

    clean() {
        this.actives.length = 0;
    }

    dot(dot, index) {
        let isFound = false;
        if (Math.sqrt(Math.pow(dot.x - this.mouse.x, 2) + Math.pow(dot.y - this.mouse.y, 2)) <= 8) {
            isFound = true;
            this.actives.push({index: index, dot: dot});
        }
        return isFound;
    }

    line(from, to, index, context, path) {
        let isFound = false;
            if (context.isPointInPath(path, this.mouse.x, this.mouse.y)) {
                isFound = true;
                this.actives.push({index: index - 1, dot: from});
                this.actives.push({index: index, dot: to});
            }
        return isFound;
    }

    getActives() {
        return this.actives;
    }
}
