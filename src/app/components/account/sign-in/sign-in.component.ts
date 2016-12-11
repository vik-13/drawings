import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.html'
})
export class SignInComponent {

    constructor(public authService: AuthService, public router: Router) {}

    signIn(event:any, form) {
        event.preventDefault();
        this.authService.auth(form).then(() => {
            this.router.navigate(['/']);
        }).catch((response) => {
            console.log(response);
        });
    }
}
