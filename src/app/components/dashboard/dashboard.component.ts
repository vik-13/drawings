import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {MdDialog, MdDialogRef} from "@angular/material";
import {DrawingDialogComponent} from "./drawing-dialog/drawing-dialog.component";

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

    dialogRef: MdDialogRef<DrawingDialogComponent>;

    constructor (public authService: AuthService,
                 public af: AngularFire,
                 public router: Router,
                 public dialog: MdDialog) {
        this.userId = this.authService.get();
        this.userObservable = af.database.object('/users/' + this.userId, {preserveSnapshot: true}).subscribe((snapshot) => {
            this.userName = snapshot.val().name;
        });
        this.drawings = af.database.list('/users/' + this.userId + '/drawings', {
            query: {
                orderByChild: 'created'
            }
        });
        this.sharedDrawings = af.database.list('/shared', {
            query: {
                orderByChild: 'created'
            }
        });
    }

    add() {
        this.dialogRef = this.dialog.open(DrawingDialogComponent, {
            disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.drawings.push({
                    name: result.name,
                    owner: this.userId,
                    created: 0 - +new Date(),
                    shared: false,
                    selectedLayout: '',
                    width: +result.width,
                    height: +result.height
                });
            }
            this.dialogRef = null;
        });
    }

    share(key: string) {
        this.sharedDrawings.push({
            drawingId: key,
            ownerId: this.userId,
            created: 0 - +new Date(),
        }).then((response) => {
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
