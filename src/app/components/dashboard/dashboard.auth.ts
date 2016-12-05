import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {Observable} from "rxjs";

@Injectable()
export class DashboardAuth implements CanActivate {
    constructor(private af: AngularFire, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.af.auth.map((auth) =>  {
            if(auth == null) {
                this.router.navigate(['/account/sign-in']);
                return false;
            } else {
                return true;
            }
        }).first()
    }
}