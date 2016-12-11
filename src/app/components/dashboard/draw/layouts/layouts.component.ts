import {Component, ViewEncapsulation} from "@angular/core";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {AuthService} from "../../../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'layouts',
    templateUrl: './layouts.html',
    styleUrls: ['./layouts.scss'],
    encapsulation: ViewEncapsulation.None
})

export class LayoutsComponent {
    drawingId: string = '';
    userId: string = '';
    selectedLayout: string = '';
    drawing: FirebaseObjectObservable<any>;
    list: FirebaseListObservable<any>;

    drawingSubscribe: any;

    constructor(public af: AngularFire,
                public authService: AuthService,
                public activatedRoute: ActivatedRoute) {

        activatedRoute.params.subscribe((params) => {
            let id = params['id'];
            if (params['shared']) {
                let subscriber = af.database.object('/shared/' + id, {preserveSnapshot: true}).subscribe((snapshot) => {
                    let shared = snapshot.val();
                    this.userId = shared.ownerId;
                    this.drawingId = shared.drawingId;
                    this.connect(this.userId, this.drawingId);
                    subscriber.unsubscribe();
                });
            } else {
                this.userId = this.authService.get();
                this.drawingId = id;
                this.connect(this.userId, this.drawingId);
            }
        });
    }

    connect(userId, drawingId) {
        this.drawing = this.af.database.object('/users/' + userId + '/drawings/' + drawingId, {preserveSnapshot: true});
        this.list = this.af.database.list('/users/' + userId + '/drawings/' + drawingId + '/layouts');

        this.drawingSubscribe = this.drawing.subscribe((snapshot) => {
            let drawing = snapshot.val();
            this.selectedLayout = drawing ? drawing.selectedLayout : '';
        });
    }

    add() {
        this.list.push({name: 'Layout 2...', visibility: true}).then((response) => {
            this.drawing.update({selectedLayout: response.key});
            this.selectedLayout = response.key;
        });
    }

    changeVisibility(event, id, visibility) {
        event.stopPropagation();
        this.list.update(id, {visibility: visibility});
    }

    show(id) {
        this.drawing.update({selectedLayout: id});
        this.selectedLayout = id;
    }

    ngOnDestroy() {
        this.drawingSubscribe.unsubscribe();
    }
}
