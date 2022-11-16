import { autorun, makeAutoObservable } from 'mobx';
import { OperationStore } from '../OperationStore';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SocketIo {
    version = 0;
    isLoading = false;
    operationStore: OperationStore;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>;

    constructor(errorStore: OperationStore) {
        makeAutoObservable(this);
        this.operationStore = errorStore;
        this.start();
    }

    start = () =>
        autorun(() => {
            const storeId = this.operationStore.loginStore.user.storeId;
            if (!this.socket) {
                if (storeId) {
                    this.connect(storeId);
                    this.event();
                }
            }
        });

    connect = (storeId: number) => {
        this.socket = io('ws://tdata1.ru:5000/', {
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
