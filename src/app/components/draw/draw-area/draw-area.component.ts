import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {DrawAreaService} from "./draw-area.service";

@Component({
  selector: 'draw-area',
  templateUrl: './draw-area.html',
  styleUrls: ['./draw-area.scss']
})

export class DrawAreaComponent {
  userId: string;
  drawingId: string;
  mouse: any = {
    x: 0,
    y: 0
  };

  move: any = {
    type: 'dot', // Could be dot, dots or line...
    last: {
      x: 0,
      y: 0
    },
    active: false,
    data: false
  };

  selectedLayout: string = '';
  size: any = {
    width: 0,
    height: 0
  };

  drawing: FirebaseObjectObservable<any>;
  layoutsObservable: FirebaseListObservable<any>;

  drawingSubscribe: any;
  layoutsSubscribe: any;
  sharedSubscribe: any;

  layouts: Array<any> = [];

  constructor(public af: AngularFire,
              public activatedRoute: ActivatedRoute,
              public authService: AuthService,
              public drawAreaService: DrawAreaService) {

    activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (params['shared']) {
        this.sharedSubscribe = af.database.object('/shared/' + id, {preserveSnapshot: true}).subscribe((snapshot) => {
          let shared = snapshot.val();
          this.userId = shared.ownerId;
          this.drawingId = shared.drawingId;
          this.connect();
          this.sharedSubscribe.unsubscribe();
        });
      } else {
        this.userId = this.authService.get();
        this.drawingId = id;
        this.connect();
      }
    });
  }

  connect() {
    this.drawAreaService.init(this.drawingId);

    this.drawing = this.af.database.object('/drawings/' + this.drawingId, {preserveSnapshot: true});
    this.drawingSubscribe = this.drawing.subscribe(snapshot => {
      let drawing = snapshot.val();
      this.selectedLayout = drawing ? drawing.selectedLayout : '';
      this.size.width = drawing ? drawing.width : 0;
      this.size.height = drawing ? drawing.height : 0;
      this.drawAreaService.setLayout(this.selectedLayout);
    });

    this.layoutsObservable = this.af.database.list('/drawings/' + this.drawingId + '/layouts', {preserveSnapshot: true});
    this.layoutsSubscribe = this.layoutsObservable.subscribe(snapshots => {
      this.layouts.length = 0;
      snapshots.forEach(snapshot => {
        let value = snapshot.val(), dot, i, next,
          layout = {
            key: snapshot.key,
            name: value.name,
            visibility: value.visibility,
            closed: value.closed,
            dots: [],
            lines: []
          };
        for (dot in value.dots) {
          if (value.dots.hasOwnProperty(dot)) {
            layout.dots.push({
              key: dot,
              x: value.dots[dot].x,
              y: value.dots[dot].y
            });
          }
        }

        if (layout.dots.length > 1) {
          for (i = 0; i < layout.dots.length; i++) {
            next = (i == layout.dots.length - 1) ? layout.dots[0] : layout.dots[i + 1];
            if ((i != layout.dots.length - 1) || layout.closed) {
              layout.lines.push({
                from: {
                  key: layout.dots[i].key,
                  x: layout.dots[i].x,
                  y: layout.dots[i].y
                },
                to: {
                  key: next.key,
                  x: next.x,
                  y: next.y
                }
              });
            }
          }
        }

        this.layouts.push(layout);
      });
    });
  }

  clickOnDot(event, dot, layout) {
    event.preventDefault();
    event.stopPropagation();
    if (event.button == 0) {
      if (layout == this.selectedLayout) {
        this.move.type = 'dot';
        this.move.active = true;
        this.move.data = dot;
      }
    } else {
      this.drawAreaService.removeDot(dot.key);
    }
  }

  clickOnLine(event, line, layout) {
    event.preventDefault();
    event.stopPropagation();
    if (event.button == 0) {
      if (layout == this.selectedLayout) {
        this.move.type = 'line';
        this.move.active = true;
        this.move.data = line;
        this.move.last.x = this.mouse.x;
        this.move.last.y = this.mouse.y;
      }
    } else {
      //this.drawAreaService.removeDot(dot.key);
    }
  }

  mouseDown(event) {
    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;
    if (event.button == 0) {
      if (this.selectedLayout) {
        this.drawAreaService.addDot(this.mouse.x, this.mouse.y);
      }
    } else {
      this.move.type = 'dots';
      this.move.active = true;
    }
    this.move.last.x = this.mouse.x;
    this.move.last.y = this.mouse.y;
  }

  mouseMove(event) {
    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;
    if (this.move.active) {
      if (this.move.type == 'dot') {
        this.drawAreaService.updateDot(this.move.data.key, this.mouse.x, this.mouse.y);
      } else if (this.move.type == 'line') {
        this.drawAreaService.updateLine(this.layouts, this.move.data, this.mouse.x - this.move.last.x, this.mouse.y - this.move.last.y);
      } else if (this.move.type == 'dots') {
        this.drawAreaService.updateDots(this.layouts, this.mouse.x - this.move.last.x, this.mouse.y - this.move.last.y);
      }
      this.move.last.x = this.mouse.x;
      this.move.last.y = this.mouse.y;
    }
  }

  mouseUp(event) {
    this.mouse.x = event.offsetX;
    this.mouse.y = event.offsetY;
    if (this.move.active) {
      this.move.active = false;
      this.move.type = '';
    }
  }

  ngOnDestroy() {
    this.drawingSubscribe.unsubscribe();
    this.layoutsSubscribe.unsubscribe();
  }
}
