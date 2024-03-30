import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const applyForSeasonTicket = (data) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/applications/apply`,
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
    url: `${config.API_URL}/v1/api/applications/all-pending-applications`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAllPendingPaymentApprovals = () => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/applications/all-pending-payment-approvals`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAnPendingApplication = (id) => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/applications/pending-application/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAnPendingPaymentApproval = (id) => {
  return axios({
    method: "get",
    url: `${config.API_URL}/v1/api/applications/pending-payment-approval/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const acceptOrRejectApplication = (id, status, note) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/applications/accept-or-reject-application`,
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
    url: `${config.API_URL}/v1/api/applications/payment-info/${id}`,
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const uploadBankSlip = (data) => {
  return axios({
    method: "post",
    url: `${config.API_URL}/v1/api/applications/upload-bank-slips`,
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
    url: `${config.API_URL}/v1/api/applications/accept-or-reject-payment-approval`,
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
