import {Injectable} from "@angular/core";
@Injectable()
export class MouseService {
    position: any;

    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
    }
}
