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

export const getAllPendingApplications = () => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/all-pending-applications`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAllPendingPaymentApprovals = () => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/all-pending-payment-approvals`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAnPendingApplication = (id) => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/pending-application/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAnPendingPaymentApproval = (id) => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/pending-payment-approval/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const acceptOrRejectApplication = (id, status, note) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/season-tickets/accept-or-reject-application`,
    data: {
      id,
      status,
      note,
    },
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getPendingPaymentInfo = (id) => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/season-tickets/payment-info/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const uploadBankSlip = (data) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/season-tickets/upload-bank-slips`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const acceptOrRejectPayment = (id, status, note) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/season-tickets/accept-or-reject-payment-approval`,
    data: {
      id,
      status,
      note,
    },
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};
