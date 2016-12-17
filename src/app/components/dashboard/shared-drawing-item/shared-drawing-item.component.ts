import {Component, Input} from "@angular/core";
import {AngularFire} from "angularfire2";
import {AuthService} from "../../../auth/auth.service";

@Component({
    selector: 'shared-drawing-item',
    templateUrl: './shared-drawing-item.html'
})

export class SharedDrawingItemComponent {
    @Input() shared: any;

    userName: any;
    drawing: any = {};

    drawingKey: string;

    userSubscriber: any;
    drawingSubscriber: any;

    constructor(public af: AngularFire) {}

    ngOnChanges() {
        this.drawingKey = this.shared.id;
        this.userSubscriber = this.af.database.object('/users/' + this.shared.userId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.userName = snapshot.val().name;
        });
        this.drawingSubscriber = this.af.database.object('/drawings/' + this.shared.id, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.drawing = snapshot.val();
        });
    }

    ngOnDestroy() {
        this.userSubscriber.unsubscribe();
        this.drawingSubscriber.unsubscribe();
    }
}
