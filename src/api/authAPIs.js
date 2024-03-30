import axios from "axios";
import config from "../config/api";

export const loginAPI = (data) => {
  return axios.post(`${config.API_URL}/v1/api/auth/login`, data);
};

export const verifyOtpAPI = (data) => {
  return axios.post(`${config.API_URL}/v1/api/auth/verify-otp`, data);
};

export const signUpAPI = (data) => {
  return axios.post(`${config.API_URL}/v1/api/auth/sign-up`, data);
};
