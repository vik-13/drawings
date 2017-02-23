import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignInComponent {

  constructor(private authService: AuthService, private router: Router, private snackBar: MdSnackBar) {}

  signIn(form) {
    if (form.valid) {
      this.authService.auth(form.value).then(() => {
        this.router.navigate(['/']);
      }).catch((response) => {
        this.snackBar.open(response, 'Try again', {duration: 10000});
      });
    } else {
      this.snackBar.open('All fields are required...', 'Try again', {duration: 10000});
    }
  }
}
