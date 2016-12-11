import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.html'
})
export class SignUpComponent {

    constructor(public authService: AuthService, public router: Router, public af: AngularFire) {}

    signUp(event:any, form) {
        event.preventDefault();
        this.authService.create(form).then((user) => {
            this.af.database.object('/users/' + user.uid).set({
                name: form.name
            }).then(() => {
                this.router.navigate(['/']);
            });
        }).catch((response) => {
            console.log(response);
        });
    }
}
