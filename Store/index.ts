import { notification } from 'antd';
import { flow, makeAutoObservable } from 'mobx';
import * as api from './Api';
import { ErrorStore } from './ErrorStore';
import { iError, iLogin, iUser } from './interfaces';

export class Login {
    user = { login: '', status: '', store: '',storeId: 0 };
    stores: { id: number; name: string }[] = [];
    errorStore: ErrorStore;
    constructor(errorStore: ErrorStore) {
        makeAutoObservable(this);
        this.errorStore = errorStore;
    }
    login = flow(function* (this: Login, data: iLogin, callBack: () => void) {
        try {
            this.user = yield api.login(data);
            this.errorStore.resetError();
            callBack();
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: 'Отказано в доступе',
            });
            console.log(err);
        }
    });
    registration = flow(function* (this: Login, data: iLogin) {
        try {
            yield api.registration(data);
            notification.success({
                message: 'Создан',
                description: 'Пользователь успешно создан',
            });
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: 'Что-то пошло не так',
            });
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
    getStores = flow(function* (this: Login) {
        try {
            this.stores = yield api.getStores();
        } catch (err) {
            this.errorStore.setError(err as iError);
        }
    });
}
