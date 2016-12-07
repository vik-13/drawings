import {Injectable} from "@angular/core";
import {FirebaseListObservable} from "angularfire2";

@Injectable()
export class DrawService {
    layouts: FirebaseListObservable<any>;
    layoutId: string;
    tool: 'line';
}
