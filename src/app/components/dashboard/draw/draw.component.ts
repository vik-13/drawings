import {Component} from "@angular/core";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'draw',
    templateUrl: './draw.html',
    styleUrls: ['./draw.scss']
})

export class DrawComponent {
    drawingId: string = '';
    userId: string = '';
    selectedLayout: string = '';
    drawing: FirebaseObjectObservable<any>;
    list: FirebaseListObservable<any>;

    drawingSubscribe: any;

    editingKey: string = '';

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
                    this.connect(this.drawingId);
                    subscriber.unsubscribe();
                });
            } else {
                this.userId = this.authService.get();
                this.drawingId = id;
                this.connect(this.drawingId);
            }
        });
    }

    connect(drawingId) {
        this.drawing = this.af.database.object('/drawings/' + drawingId, {preserveSnapshot: true});
        this.list = this.af.database.list('/drawings/' + drawingId + '/layouts');

        this.drawingSubscribe = this.drawing.subscribe((snapshot) => {
            let drawing = snapshot.val();
            this.selectedLayout = drawing ? drawing.selectedLayout : '';
        });
    }

    editName(key) {
        this.editingKey = key;
    }

    changeName(event, nameLink) {
        if (event.charCode == 13) {
            event.preventDefault();

            this.list.update(this.editingKey, {
                name: nameLink.innerText
            });
            this.editingKey = '';
        }
    }

    add() {
        this.list.push({
            name: 'Unnamed layout',
            visibility: true,
            closed: true
        }).then((response) => {
            this.drawing.update({selectedLayout: response.key});
            this.selectedLayout = response.key;
        });
    }

    changeClosed(event, key, value) {
        event.stopPropagation();
        this.list.update(key, {
            closed: value
        });
    }

    remove(key) {
        this.list.remove(key);
        this.drawing.update({selectedLayout: ''});
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
