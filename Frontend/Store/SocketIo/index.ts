import { flow, makeAutoObservable } from 'mobx';
import { OperationStore } from '../OperationStore';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import * as api from './api';

const isDev = process.env.NODE_ENV == 'development';
export class SocketIo {
    version = 0;
    isLoading = false;
    operationStore: OperationStore;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
    socketUrl = isDev ? 'http://tdata1.ru:5000' : '';

    constructor(errorStore: OperationStore) {
        makeAutoObservable(this);
        this.operationStore = errorStore;
    }

    getSocketUrl = flow(function* (this: SocketIo) {
        return yield api.getSocketUrl();
    });

    start = async () => {
        const storeId = this.operationStore.loginStore.user.storeId;
        if (!this.socket) {
            if (storeId) {
                this.connect();
                this.event();
            }
        }
    };

    connect = () => {
        const storeId = this.operationStore.loginStore.user.storeId;
        this.socket = io(this.socketUrl, {
            reconnectionDelayMax: 10000,
            transports: ['websocket'],
            query: {
                room: `store_${storeId}`,
            },
        });
    };

    event = () => {
        if (this.socket) {
            this.socket.on('maxId', (maxId) => {
                this.operationStore.setMaxIdSocket(maxId);
            });
            this.socket.on('connect_error', (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
        }
    };
}
