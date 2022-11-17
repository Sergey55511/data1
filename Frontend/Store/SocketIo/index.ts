import { autorun, flow, makeAutoObservable } from 'mobx';
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
        this.start();
    }

    getSocketUrl = flow(function* (this: SocketIo) {
        this.socketUrl = yield api.getSocketUrl();
    });

    start = () => {
        autorun(() => {
            const storeId = this.operationStore.loginStore.user.storeId;
            const socketUrl = this.socketUrl;
            if (!this.socket) {
                if (storeId) {
                    if (!socketUrl) this.getSocketUrl();
                    if (socketUrl) {
                        this.connect(storeId);
                        this.event();
                    }
                }
            }
        });
    };

    connect = (storeId: number) => {
        const socketUrl = this.socketUrl || '/';

        this.socket = io(socketUrl, {
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
