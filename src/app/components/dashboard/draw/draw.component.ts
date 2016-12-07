import {Component} from "@angular/core";
import Draw from "./draw-area/draw";
import {AngularFire} from "angularfire2";
import {DrawService} from "./draw.service";

@Component({
    selector: 'draw',
    templateUrl: './draw.html',
    styleUrls: ['./draw.scss']
})

export class DrawComponent {
    draw: Draw;

    constructor(public af: AngularFire, public drawService: DrawService) {
        drawService.layouts = this.af.database.list('/layouts');
    }

    ngAfterViewInit() {
        //this.draw = new Draw('draw-area', this.drawService);
    }
}
