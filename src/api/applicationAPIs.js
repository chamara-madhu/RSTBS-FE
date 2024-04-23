import axios from "axios";
import { auth_token } from "../auth/auth";
import config from "../config/api";

export const submitApplication = (data) => {
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

export const reSubmitApplication = (data) => {
  return axios({
    method: "put",
    url: `${config.API_URL}/v1/api/applications/update`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const getAllPendingApplications = () => {
  return axios.get(
    `${config.API_URL}/v1/api/applications/all-pending-applications`,
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const getAllPendingPaymentApprovals = () => {
  return axios.get(
    `${config.API_URL}/v1/api/applications/all-pending-payment-approvals`,
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const getAnPendingApplication = (id) => {
  return axios.get(
    `${config.API_URL}/v1/api/applications/pending-application/${id}`,
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const getAnPendingPaymentApproval = (id) => {
  return axios.get(
    `${config.API_URL}/v1/api/applications/pending-payment-approval/${id}`,
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const acceptOrRejectApplication = (id, status, note) => {
  return axios.post(
    `${config.API_URL}/v1/api/applications/accept-or-reject-application`,
    {
      id,
      status,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const getPendingPaymentInfo = (id) => {
  return axios.get(`${config.API_URL}/v1/api/applications/payment-info/${id}`, {
    headers: {
      Authorization: `Bearer ${auth_token()}`,
    },
  });
};

export const uploadBankSlip = (data) => {
  return axios.post(
    `${config.API_URL}/v1/api/applications/upload-bank-slips`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};

export const acceptOrRejectPayment = (id, status, note) => {
  return axios.post(
    `${config.API_URL}/v1/api/applications/accept-or-reject-payment-approval`,
    {
      id,
      status,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${auth_token()}`,
      },
    }
  );
};
