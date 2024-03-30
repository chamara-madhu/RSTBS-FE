import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const getMySeasonTicket = () => {
  return axios(`${config.API_URL}/v1/api/season-tickets/my`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getSeasonTicketFee = (data) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/season-tickets/fee`,
    data,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getSeasonTicketUsage = (id) => {
  return axios(`${config.API_URL}/v1/api/season-tickets/usage/${id}`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
