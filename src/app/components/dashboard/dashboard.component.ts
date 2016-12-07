import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent {
    files: FirebaseListObservable<any>;

    constructor (public authService: AuthService, public af: AngularFire, public router: Router) {
        this.files = af.database.list('/files');
    }

    add() {
        this.files.push({id: 'file_id', name: 'Untitled file...'});
    }

    signOut() {
        this.authService.unAuth();
        //TODO: Should be redirected to sign-in!!!
        this.router.navigate(['/account/sign-in']);
    }
}
