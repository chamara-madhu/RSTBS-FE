import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config.js/api";

export const getMySeasonTicket = () => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/my`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
