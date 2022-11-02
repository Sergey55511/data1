import React from 'react';
import { Login } from './LoginStore';
import { ErrorStore } from './ErrorStore';
import { ListsStore } from './Lists';
import { OperationStore } from './OperationStore';
import { UIStore } from './UIStore';

class Store {
    ErrorStore = new ErrorStore();
    UIStore = new UIStore(this.ErrorStore);
    loginStore = new Login(this.ErrorStore);
    ListsStore = new ListsStore(this.ErrorStore, this.loginStore);
    OperationStore = new OperationStore(
        this.ErrorStore,
        this.loginStore,
        this.ListsStore,
    );
}
const store = new Store();

export const MyContext = React.createContext(store);
export const StoreContext = ({ children }: { children: JSX.Element }) => (
    <MyContext.Provider value={store}>{children}</MyContext.Provider>
);
