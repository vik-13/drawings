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
    userName: string;

    drawings: FirebaseListObservable<any>;
    sharedDrawings: FirebaseListObservable<any>;

    userObservable: any;
    authObservable: any;

    constructor (public authService: AuthService, public af: AngularFire, public router: Router) {
        this.userId = this.authService.get();
        this.userObservable = af.database.object('/users/' + this.userId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.userName = snapshot.val().name;
        });
        this.drawings = af.database.list('/users/' + this.userId + '/drawings');
        this.sharedDrawings = af.database.list('/shared');
    }

    add() {
        this.drawings.push({
            name: 'Untitled file...',
            owner: this.userId,
            shared: false,
            selectedLayout: '',
            width: 320,
            height: 240
        });
    }

    share(key: string) {
        this.sharedDrawings.push({drawingId: key, ownerId: this.userId}).then((response) => {
            this.af.database.object('/users/' + this.userId + '/drawings/' + key).update({shared: response.key});
        });
    }

    unShare(drawing: any) {
        this.sharedDrawings.remove(drawing.shared);
        this.af.database.object('/users/' + this.userId + '/drawings/' + drawing.$key).update({shared: false});
    }

    remove(drawing: any) {
        if (drawing.shared) {
            this.sharedDrawings.remove(drawing.shared);
        }
        this.drawings.remove(drawing.$key);
    }

    signOut() {
        this.authObservable = this.af.auth.subscribe((auth) => {
            if (!auth) {
                this.router.navigate(['/account/sign-in']);
            }
        });
        this.authService.unAuth();
    }

    ngOnDestroy() {
        this.userObservable.unsubscribe();
        if (this.authObservable) {
            this.authObservable.unsubscribe();
        }
    }
}
