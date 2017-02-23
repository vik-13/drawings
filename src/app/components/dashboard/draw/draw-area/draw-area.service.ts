import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Injectable()
export class DrawAreaService {
  drawingId: string;
  layoutId: string;

  dots: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
  }

  init(drawingId) {
    this.drawingId = drawingId;
  }

  setLayout(layoutId) {
    this.layoutId = layoutId;

    this.dots = this.af.database.list('/drawings/' + this.drawingId + '/layouts/' + this.layoutId + '/dots');
  }

  addDot(x, y) {
    this.dots.push({x: x, y: y});
  }

  updateDot(key, x, y) {
    this.dots.update(key, {x: x, y: y});
  }

  updateLine(layouts, line, x, y) {
    let layout;

    layouts.forEach((item) => {
      if (item.key == this.layoutId) {
        layout = item;
      }
    });

    layout.dots.forEach((dot) => {
      if (dot.key == line.from.key || dot.key == line.to.key) {
        this.updateDot(dot.key, dot.x + x, dot.y + y);
      }
    });
  }

  updateDots(layouts, x, y) {
    let layout;

    layouts.forEach((item) => {
      if (item.key == this.layoutId) {
        layout = item;
      }
    });

    layout.dots.forEach((dot) => {
      this.updateDot(dot.key, dot.x + x, dot.y + y);
    });
  }

  removeDot(key) {
    this.dots.remove(key);
  }
}
