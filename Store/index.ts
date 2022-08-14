import { flow, makeAutoObservable } from "mobx";
import * as api from "./Api";
import { iLogin } from "./interfaces";

export class Login {
  constructor() {
    makeAutoObservable(this);
  }
  login = flow(function* (data: iLogin) {
    try {
      const res = yield api.login(data);
      console.log (res)
    } catch (err) {
      console.log(err);
    }
  });
}
