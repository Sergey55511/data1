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
        console.log('start');
        const storeId = this.operationStore.loginStore.user.storeId;
        const socketUrl = this.socketUrl;
        if (!this.socket) {
            console.log('start1');
            if (storeId) {
                console.log('start2');
                if (!socketUrl) {
                    console.log('start3');
                    this.socketUrl = await this.getSocketUrl();
                    if (this.socketUrl) {
                        console.log('start4');
                        this.connect();
                        this.event();
                    }
                }
            }
        }
    };

    connect = () => {
        console.log('connect', this.socketUrl);

        const storeId = this.operationStore.loginStore.user.storeId;
        this.socket = io('', {
            // path:'/ws',
            reconnectionDelayMax: 10000,
            transports: ['websocket'],
            // rememberUpgrade: true,
            // timestampRequests: true,
            // auth: {
            //     token: '123',
            // },
            // secure: true,
            // rejectUnauthorized: false,
            query: {
                room: `store_${storeId}`,
            },
        });
        console.log('this.socket', this.socket);
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
