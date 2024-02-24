import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config.js/api";

export const applyForSeasonTicket = (data) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/season-tickets/apply`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
