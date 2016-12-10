import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent {
    userId: string = '';
    files: FirebaseListObservable<any>;
    drawings: FirebaseObjectObservable<any>;

    constructor (public authService: AuthService, public af: AngularFire, public router: Router) {
        this.userId = this.authService.get();
        this.files = af.database.list('/users/' + this.userId + '/files');
    }

    add() {
        let fileId = this.generateUniqueId();
        this.files.push({id: fileId, name: 'Untitled file...'});
        this.af.database.object('/drawings/' + fileId).set({
            owner: this.userId,
            selectedLayout: '',
            tool: 'line'
        });
    }

    remove(event, key, fileId) {
        event.stopPropagation();
        this.files.remove(key);
        this.af.database.object('/drawings/' + fileId).remove();
    }

    signOut() {
        this.authService.unAuth();
        //TODO: Should be redirected to sign-in!!!
        this.router.navigate(['/account/sign-in']);
    }

    private generateUniqueId(): string {
        let uniqueIdMask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
            uniqueId = '',
            i, letter;
        for(i = 0; i < uniqueIdMask.length; i++) {
            letter = uniqueIdMask.substr(i, 1);
            if (letter == 'x') {
                uniqueId += (Math.floor(Math.random() * 16)).toString(16);
            } else if (letter == 'y') {
                uniqueId += ( 8 + Math.floor(Math.random() * 4)).toString(16);
            } else {
                uniqueId += letter;
            }
        }
        return uniqueId;
    }
}
