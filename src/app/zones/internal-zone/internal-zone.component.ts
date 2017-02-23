import {Component} from "@angular/core";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'internal-zone',
  templateUrl: './internal-zone.html',
  styleUrls: ['./internal-zone.scss']
})

export class InternalZoneComponent {
  constructor(private af: AngularFire) {}

  signOut() {
    this.af.auth.logout();
  }
}
