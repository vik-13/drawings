import Layouts from "./layouts";
import Interact from "./interact";

export default class Paint {
    layouts: Layouts;
    interact: Interact;
    mouse: any;
    tool: String;
    movement: any;

    constructor(Layouts, Interact, Mouse) {
        this.layouts = Layouts;
        this.interact = Interact;
        this.mouse = Mouse;

        this.tool = 'line';
        this.movement = {
            isActive : false,
            index: -1
        };

        //store.subscribe(this.update.bind(this));
    }

    update() {
        // let state = store.getState();
        // if (this.tool != state.tool) {
        //     this.tool = state.tool;
        // }
    }

    split(from) {
        this.layouts.pushAfterIndex(from.index, this.mouse.x, this.mouse.y);
    }

    down() {
        let actives = this.interact.getActives();

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
            this.layouts.move(this.mouse.x, this.mouse.y, this.movement.index);
        }
    }

    up() {
        let actives = this.interact.getActives();

        switch (this.tool) {
            case 'move':
                this.movement.isActive = false;
                this.movement.index = -1;
                return;
            case 'line':
                this.layouts.push(this.mouse.x, this.mouse.y);
                return;
            case 'split':
                if (actives.length == 2) {
                    this.split(actives[0]);
                }
                return;
            case 'remove':
                this.layouts.removeDot(actives[0].index);
                return;
            default:
                return;
        }
    }
}
