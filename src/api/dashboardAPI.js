import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const getUserStats = () => {
  return axios.get(`${config.API_URL}/v1/api/dashboard/stats/user`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getPendingApplicationsAndPaymentsStats = () => {
  return axios.get(
    `${config.API_URL}/v1/api/dashboard/stats/pending-applications-and-payments`,
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};
