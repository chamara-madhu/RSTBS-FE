import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const getSeasonTicketHistory = () => {
  return axios.get(`${config.API_URL}/v1/api/season-tickets/my`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getSeasonTicket = (id) => {
  return axios.get(`${config.API_URL}/v1/api/season-tickets/${id}`, {
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
  return axios.get(`${config.API_URL}/v1/api/season-tickets/usage/${id}`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const renewSeasonTicket = () => {
  return axios.post(`${config.API_URL}/v1/api/season-tickets/renew`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
