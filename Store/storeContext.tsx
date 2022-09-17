import React from 'react';
import { Login } from '.';
import { ErrorStore } from './ErrorStore';
import { ListsStore } from './Lists';
import { OperationStore } from './OperationStore';

class Store {
    ErrorStore = new ErrorStore();
    loginStore = new Login(this.ErrorStore);
    OperationStore = new OperationStore(this.ErrorStore);
    ListsStore=new ListsStore()
}
const store = new Store();

export const MyContext = React.createContext(store);
export const StoreContext = ({ children }: { children: JSX.Element }) => (
    <MyContext.Provider value={store}>{children}</MyContext.Provider>
);
