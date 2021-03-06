import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUpComponent {

  constructor(private authService: AuthService, private router: Router, private af: AngularFire, private snackBar: MdSnackBar) {
  }

  signUp(form) {
    if (form.valid) {
      this.authService.create(form.value).then((user) => {
        this.af.database.object('/users/' + user.uid).set({
          name: form.value.name
        }).then(() => {
          this.router.navigate(['/']);
        });
      }).catch((response) => {
        this.snackBar.open(response, 'Try again', {duration: 10000});
      });
    } else {
      this.snackBar.open('All fields are required...', 'Try again', {duration: 10000});
    }
  }
}
