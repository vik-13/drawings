import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";

@Injectable()
export class LayoutService {
    layoutId: string = '';
    dots: any;

    constructor(public af: AngularFire) {
        this.update();
    }

    update() {
        if (this.layoutId) {
            this.dots = this.af.database.list('/layouts/' + this.layoutId + '/dots');
        }
    }

    set(layoutId) {
        this.layoutId = layoutId;
        this.update();
    }

    push(x, y) {
        if (this.dots) {
            this.dots.push({
                x: x,
                y: y
            });
        } else {
            console.log('There is no selected layout...');
        }
    }

    pushAfterIndex(index, x, y) {
        //this.getCurrentLayout().dots.splice(index + 1, 0, {x: x, y: y});
    }

    move(x, y, index) {
        this.dots.update(index, {x: x, y: y});
    }

    removeDot(index) {
        this.dots.remove(index);
    }
}
