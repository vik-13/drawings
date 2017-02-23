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
  userId: string = '';
  userName: string;

  createMode: boolean = false;

  drawings: FirebaseListObservable<any>;
  sharedDrawings: FirebaseListObservable<any>;

  userObservable: any;

  constructor(private authService: AuthService, private af: AngularFire, private router: Router) {

    this.userId = this.authService.get();
    this.userObservable = af.database.object('/users/' + this.userId).subscribe((snapshot) => {
      this.userName = snapshot.name;
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

  showCreationForm() {
    this.createMode = true;
  }

  cancel() {
    this.createMode = false;
  }

  add(data) {
    this.af.database.list('/drawings').push({
      name: data.name,
      userId: this.userId,
      created: +new Date(),
      shared: false,
      selectedLayout: '',
      width: +data.width,
      height: +data.height
    }).then((response) => {
      this.drawings.push({
        created: 0 - +new Date(),
        id: response.key
      });
    });
    this.createMode = false;
  }

  share(key: string) {
    this.sharedDrawings.push({
      created: 0 - +new Date(),
      id: key,
      userId: this.userId,
    }).then((response) => {
      this.af.database.object('/drawings/' + key).update({shared: response.key});
    });
  }

  unShare(data: any) {
    this.sharedDrawings.remove(data.sharedKey);
    this.af.database.object('/drawings/' + data.key).update({shared: false});
  }

  remove(data: any) {
    if (data.sharedKey) {
      this.sharedDrawings.remove(data.sharedKey);
    }
    this.af.database.list('/drawings').remove(data.key);
    this.drawings.remove(data.linkKey);
  }

  signOut() {
    this.authService.unAuth();
  }

  ngOnDestroy() {
    this.userObservable.unsubscribe();
  }
}
