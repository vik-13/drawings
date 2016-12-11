import {Component, Input} from "@angular/core";
import {AngularFire} from "angularfire2";

@Component({
    selector: 'shared-drawing-item',
    templateUrl: './shared-drawing-item.html'
})

export class SharedDrawingItemComponent {
    @Input() shared: any;

    userName: any;
    drawing: any = {};

    sharedKey: string;

    userSubscriber: any;
    drawingSubscriber: any;


    constructor(public af: AngularFire) {

    }

    ngOnChanges(changes: any) {
        this.sharedKey = this.shared.$key;
        this.userSubscriber = this.af.database.object('/users/' + this.shared.ownerId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.userName = snapshot.val().name;
        });
        this.drawingSubscriber = this.af.database.object('/users/' + this.shared.ownerId + '/drawings/' + this.shared.drawingId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.drawing = snapshot.val();
        });
    }

    ngOnDestroy() {
        this.userSubscriber.unsubscribe();
        this.drawingSubscriber.unsubscribe();
    }
}
