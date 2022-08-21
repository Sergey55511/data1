import React from 'react';
import { Login } from '.';
import { ErrorStore } from './ErrorStore';
import { iLogin } from './interfaces';

class Store {
    ErrorStore = new ErrorStore();
    loginStore = new Login(this.ErrorStore);
}
const store = new Store();

export const MyContext = React.createContext(store);
export const StoreContext = ({ children }: { children: JSX.Element }) => (
    <MyContext.Provider value={store}>{children}</MyContext.Provider>
);
