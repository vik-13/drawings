import {Component} from "@angular/core";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";

@Component({
    selector: 'layouts',
    templateUrl: './layouts.html',
    styleUrls: ['./layouts.scss']
})

export class LayoutsComponent {
    list: FirebaseListObservable<any>;
    current: FirebaseObjectObservable<any>;

    constructor(public af: AngularFire) {
        this.list = af.database.list('/layouts');
    }

    show(id) {
        console.log(id);
        this.current = this.af.database.object('/layouts/' + id, { preserveSnapshot: true });
        this.current.subscribe((spanshot) => {
            console.log(spanshot.val());
        });
    }
}
