import {Component} from "@angular/core";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";

@Component({
    selector: 'tools',
    templateUrl: './tools.html',
    styleUrls: ['./tools.scss']
})

export class ToolsComponent {
    fileId: string = '';
    userId: string = '';
    tool: string = '';
    file: FirebaseObjectObservable<any>;

    constructor(public af: AngularFire, public authService: AuthService, public activatedRoute: ActivatedRoute) {
        this.userId = this.authService.get();
        activatedRoute.params.subscribe((params) => {
            this.fileId = params['id'];
            this.file = af.database.object('/' + this.userId + '/drawings/' + this.fileId, {preserveSnapshot: true});

            this.file.subscribe((snapshot) => {
                let file = snapshot.val();
                this.tool = file.tool;
            })
        });
    }

    set(tool) {
        this.file.update({tool: tool});
    }
}
