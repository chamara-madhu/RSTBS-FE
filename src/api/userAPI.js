import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const getUserQR = () => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/users`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
