import {Injectable} from "@angular/core";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../../../auth/auth.service";
import {DrawAreaService} from "./draw-area.service";

@Injectable()
export class LayoutService {
    fileId: string = '';
    userId: string = '';
    layoutId: string = '';

    file: FirebaseObjectObservable<any>;
    dots: FirebaseListObservable<any>;

    constructor(public af: AngularFire, public authService: AuthService, public drawAreaService: DrawAreaService) {
        this.userId = this.authService.get();
        drawAreaService.fileId.subscribe(fileId => {
            this.fileId = fileId;
            this.file = af.database.object('/' + this.userId + '/drawings/' + this.fileId, {preserveSnapshot: true});

            this.file.subscribe((snapshot) => {
                let file = snapshot.val();
                this.layoutId = file.selectedLayout;
                this.dots = af.database.list('/' + this.userId + '/drawings/' + this.fileId + '/layouts/' + this.layoutId + '/dots');
            })
        });
    }

    push(x, y) {
        if (this.dots) {
            this.dots.push({
                x: x,
                y: y
            });
        } else {
            console.log('There is no selected layout...');
        }
    }

    pushAfterIndex(index, x, y) {
        //this.getCurrentLayout().dots.splice(index + 1, 0, {x: x, y: y});
    }

    move(x, y, index) {
        this.dots.update(index, {x: x, y: y});
    }

    removeDot(index) {
        this.dots.remove(index);
    }
}
