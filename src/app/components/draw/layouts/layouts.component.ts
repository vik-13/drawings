import {Component} from "@angular/core";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
  styleUrls: ['./layouts.scss']
})
export class LayoutsComponent {
  drawingId: string = '';
  userId: string = '';
  selectedLayout: string = '';

  drawing: FirebaseObjectObservable<any>;
  list: FirebaseListObservable<any>;

  drawingObject: any;

  drawingSubscribe: any;
  routeParamsSubscriber: any;

  constructor(private af: AngularFire, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.routeParamsSubscriber = activatedRoute.params.subscribe((params) => {
      this.userId = this.authService.get();
      this.drawingId = params['id'];
      this.connect(this.drawingId);
    });
  }

  connect(drawingId) {
    this.drawing = this.af.database.object('/drawings/' + drawingId);
    this.list = this.af.database.list('/drawings/' + drawingId + '/layouts');

    this.drawingSubscribe && this.drawingSubscribe.unsubscribe();
    this.drawingSubscribe = this.drawing.subscribe((snapshot) => {
      this.drawingObject = snapshot;
      this.selectedLayout = this.drawingObject ? this.drawingObject.selectedLayout : '';
    });
  }

  add(name) {
    this.list.push({
      name: name,
      visibility: true,
      closed: false
    }).then((response) => {
      this.drawing.update({selectedLayout: response.key});
      this.selectedLayout = response.key;
    });
  }

  changeClosed(key, value) {
    this.list.update(key, {closed: value});
  }

  settings(key) {
    console.log('go to settings');
  }

  remove(key) {
    this.list.remove(key);
    this.drawing.update({selectedLayout: ''});
  }

  changeVisibility(id, visibility) {
    this.list.update(id, {visibility: visibility});
  }

  show(id) {
    this.drawing.update({selectedLayout: id});
    this.selectedLayout = id;
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    this.drawingSubscribe.unsubscribe();
    this.routeParamsSubscriber.unsubscribe();
  }
}
