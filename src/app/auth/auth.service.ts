import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
    userId: string = '';

    constructor(public af: AngularFire) {}

    set(id) {
        this.userId = id;
    }

    get() {
        return this.userId;
    }

    create(data: any): any {
        return this.af.auth.createUser(data);
    }

    auth(data: any): any {
        return this.af.auth.login(data);
    }

    unAuth(){
        console.log('logout');
        return this.af.auth.logout();
    }
}
