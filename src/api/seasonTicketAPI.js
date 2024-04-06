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
  return axios.post(`${config.API_URL}/v1/api/season-tickets/fee`, data, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const seasonTicketOnlinePayment = (amount, id) => {
  return axios.post(
    `${config.API_URL}/v1/api/season-tickets/create-checkout-session`,
    {
      seasonTicketId: id,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const activateSeasonTicket = (id) => {
  return axios.post(
    `${config.API_URL}/v1/api/season-tickets/active`,
    {
      seasonTicketId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
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
