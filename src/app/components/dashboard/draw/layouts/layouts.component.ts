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
    fileId: string = '';
    userId: string = '';
    selectedLayout: string = '';
    file: FirebaseObjectObservable<any>;
    list: FirebaseListObservable<any>;

    constructor(public af: AngularFire,
                public authService: AuthService,
                public activatedRoute: ActivatedRoute) {

        this.userId = this.authService.get();
        activatedRoute.params.subscribe((params) => {
            this.fileId = params['id'];
            this.file = af.database.object('/' + this.userId + '/drawings/' + this.fileId, {preserveSnapshot: true});
            this.list = af.database.list('/' + this.userId + '/drawings/' + this.fileId + '/layouts');

            this.file.subscribe((snapshot) => {
                let file = snapshot.val();
                this.selectedLayout = file.selectedLayout;
            })
        });
    }

    add() {
        this.list.push({name: 'Layout 2...', visibility: true}).then((response) => {
            this.file.update({selectedLayout: response.key});
            this.selectedLayout = response.key;
        });
    }

    changeVisibility(id, visibility) {
        this.list.update(id, {visibility: visibility});
    }

    show(id) {
        this.file.update({selectedLayout: id});
        this.selectedLayout = id;
    }
}
