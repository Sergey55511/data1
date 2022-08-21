import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from './ErrorStore';
import { iError, iLogin, iUser } from './interfaces';

export class Login {
    user = { login: '', status: '' };
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }
    login = flow(function* (this: Login, data: iLogin) {
        try {
            this.user = yield api.login(data);
        } catch (err) {
            console.log(err);
        }
    });
    registration = flow(function* (this: Login, data: iLogin) {
        try {
            yield api.registration(data);
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });

    whoami = flow(function* (this: Login) {
        try {
            this.user = yield api.whoami();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
