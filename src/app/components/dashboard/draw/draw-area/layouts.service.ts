import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";

@Injectable()
export class LayoutsService {
    dots: any;

    constructor(public af: AngularFire) {
        af.database.list('/layouts', {preserveSnapshot: true}).subscribe((snapshots) => {
            snapshots.forEach(snapshot => {
                this.dots = af.database.list('/layouts/' + snapshot.key + '/dots');
            });
        });
    }

    push(x, y) {
        this.dots.push({
            x: x,
            y: y
        });
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
