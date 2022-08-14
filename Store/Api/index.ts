import axios from "axios";
import { iLogin } from "../interfaces";

export const login = (data: iLogin) => {
  return axios({
    url: "/api/login",
    method: "POST",
    data,
  }).then((res) => res.data);
};
