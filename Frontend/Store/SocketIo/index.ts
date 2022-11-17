import { flow, makeAutoObservable } from 'mobx';
import { OperationStore } from '../OperationStore';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import * as api from './api';

export class SocketIo {
    version = 0;
    isLoading = false;
    operationStore: OperationStore;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
    socketUrl = '';

    constructor(errorStore: OperationStore) {
        makeAutoObservable(this);
        this.operationStore = errorStore;
    }

    getSocketUrl = flow(function* (this: SocketIo) {
        return yield api.getSocketUrl();
    });

    start = async () => {
        const storeId = this.operationStore.loginStore.user.storeId;
        const socketUrl = this.socketUrl;
        if (!this.socket) {
            if (storeId) {
                if (!socketUrl) {
                    this.socketUrl = await this.getSocketUrl();
                    if (this.socketUrl) {
                        this.connect();
                        this.event();
                    }
                }
            }
        }
    };

    connect = () => {
        const storeId = this.operationStore.loginStore.user.storeId;
        this.socket = io('http://tdata1.ru:5000', {
            reconnectionDelayMax: 10000,
            transports: ['websocket'],
            // auth: {
            //     token: '123',
            // },
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
        }
    };
}
