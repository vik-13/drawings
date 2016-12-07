import Layouts from './layouts';
import Render from './render';
import Paint from './paint';
import Interact from './interact';

export default class Draw {
    canvasId: String;
    mouse: any;
    layouts: Layouts;
    interact: Interact;
    paint: Paint;
    render: Render;

    constructor(canvasId: String, data: any) {
        this.canvasId = canvasId;

        this.mouse = {
            x: 0,
            y: 0
        };

        this.layouts = new Layouts(data);
        this.interact = new Interact(this.mouse);
        this.paint = new Paint(data, this.interact, this.mouse);
        this.render = new Render(this.canvasId, data, this.paint, this.interact);

        this.lifeCycle();
    }

    lifeCycle() {
        this.render.update();
        window.requestAnimationFrame(this.lifeCycle.bind(this));
    }

    handleMouseDown(event) {
        this.mouse.x = event.clientX - event.currentTarget.offsetLeft - event.currentTarget.offsetParent.offsetLeft;
        this.mouse.y = event.clientY - event.currentTarget.offsetTop - event.currentTarget.offsetParent.offsetTop;
        this.paint.down();
    }

    handleMouseMove(event) {
        this.mouse.x = event.clientX - event.currentTarget.offsetLeft - event.currentTarget.offsetParent.offsetLeft;
        this.mouse.y = event.clientY - event.currentTarget.offsetTop - event.currentTarget.offsetParent.offsetTop;
        this.paint.move();
    }

    handleMouseUp(event) {
        this.mouse.x = event.clientX - event.currentTarget.offsetLeft - event.currentTarget.offsetParent.offsetLeft;
        this.mouse.y = event.clientY - event.currentTarget.offsetTop - event.currentTarget.offsetParent.offsetTop;
        this.paint.up();
    }
}
