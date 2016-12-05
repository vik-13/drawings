import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
    constructor(public af: AngularFire) {}

    auth(data: any): any {
        return this.af.auth.login(data);
    }

    unAuth(){
        return this.af.auth.logout();
    }
}
