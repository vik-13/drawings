import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class DrawAreaService {
    observer: any;
    fileId: Observable<string>;

    constructor() {
        this.fileId = Observable.create(observer => {
            this.observer = observer;
        });
    }

    setFileId(fileId) {
        this.observer.next(fileId);
    }
}
