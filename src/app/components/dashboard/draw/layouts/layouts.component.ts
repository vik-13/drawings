import {Component} from "@angular/core";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import {LayoutService} from "../draw-area/layout.service";
import {AuthService} from "../../../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'layouts',
    templateUrl: './layouts.html',
    styleUrls: ['./layouts.scss']
})

export class LayoutsComponent {
    fileId: string = '';
    userId: string = '';
    selectedLayout: string = '';
    file: FirebaseObjectObservable<any>;
    list: FirebaseListObservable<any>;

    constructor(public af: AngularFire,
                public layoutService:LayoutService,
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

    show(id) {
        this.layoutService.set(id);
        this.file.update({selectedLayout: id});
        this.selectedLayout = id;
    }
}
