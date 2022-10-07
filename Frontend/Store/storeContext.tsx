import React from 'react';
import { Login } from './LoginStore';
import { ErrorStore } from './ErrorStore';
import { ListsStore } from './Lists';
import { OperationStore } from './OperationStore';
import { UIStore } from './UIStore';

class Store {
    UIStore = new UIStore();
    ErrorStore = new ErrorStore();
    loginStore = new Login(this.ErrorStore);
    ListsStore = new ListsStore(this.ErrorStore);
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
