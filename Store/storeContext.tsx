import React from "react";
import { Login } from ".";
import { iLogin } from "./interfaces";


const store = {
  login: new Login(),
};
export const MyContext = React.createContext<{login: Login}>(store);
export const StoreContext = ({ children }: { children: JSX.Element }) => (
  <MyContext.Provider value={store}>{children}</MyContext.Provider>
);

