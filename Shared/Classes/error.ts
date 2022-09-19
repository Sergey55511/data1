export class MyError {
    status: number = 500;
    message = 'Что-то пошло не так';
    constructor(status: number, message?: string) {
        this.status = status;
        if (message) {
            this.message = message;
            return;
        }
        switch (status) {
            case 400:
                this.message = 'Не верные параметры запроса';
                break;
            case 401:
                this.message = 'Не авторизован';
                break;
            case 403:
                this.message = 'Нет прав';
                break;
            case 404:
                this.message = 'Не найден';
                break;
        }
    }
}
