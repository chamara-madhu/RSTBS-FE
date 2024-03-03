import React, { useEffect, useState } from "react";
import { Check, X } from "feather-icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/buttons/Button";
import {
  acceptOrRejectPayment,
  getAnPendingPaymentApproval,
} from "../../../api/applicationAPIs";
import PageHeader from "../../shared/headers/PageHeader";
import config from "../../../config.js/api";
import PreLoading from "../../shared/loading/PreLoading";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { ADMIN_PENDING_PAYMENT_APPROVALS_PATH } from "../../../constant/paths";

const ReviewPaymentApprovalMain = () => {
  const [data, setData] = useState(null);
  const [preLoading, setPreLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAnPendingPaymentApproval(id)
      .then((res) => {
        setData(res.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPreLoading(false);
      });
  }, [id]);

  const acceptRejectPayment = (id, status, note = null) => {
    if (note) {
      setLoadingReject(true);
    } else {
      setLoadingAccept(true);
    }

    acceptOrRejectPayment(id, status, note)
      .then(() => {
        setLoadingAccept(false);
        setLoadingReject(false);
        navigate(ADMIN_PENDING_PAYMENT_APPROVALS_PATH);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoadingAccept(false);
        setLoadingReject(false);
      });
  };

  return (
    <>
      <PageHeader title="Review payment" showBack />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="relative flex w-full gap-6 mb-6">
          <div style={{ width: "calc(100% - 400px)" }}>
            {data && (
              <table className="table-fixed">
                <tbody className="text-sm">
                  <tr>
                    <td className="py-2 font-medium text-left">Booking ID</td>
                    <td className="px-4 py-2 text-left">{data._id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Full name</td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Amount (Rs.)</td>
                    <td className="px-4 py-2 text-left">
                      {data.amount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <p className="my-3 text-sm font-medium">Payment slip</p>
            <img
              src={`${config.S3_PUBLIC_URL}/${data?.bankSlipImage}`}
              alt="NIC front side"
              className="w-[600px] border rounded-xl"
            />
            <div className="flex flex-row gap-4 mt-6">
              <Button
                type="submit"
                variant="dark"
                className="w-[150px]"
                isLoading={loadingAccept}
                handleButton={() =>
                  acceptRejectPayment(
                    data._id,
                    APPLICATION_STATUSES.ACTIVE,
                    null
                  )
                }
              >
                <Check size={16} /> Accept
              </Button>
              <Button
                type="submit"
                variant="danger"
                className="w-[150px]"
                isLoading={loadingReject}
                handleButton={() =>
                  acceptRejectPayment(
                    data._id,
                    APPLICATION_STATUSES.PAYMENT_REJECTED,
                    "Test"
                  )
                }
              >
                <X size={16} /> Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewPaymentApprovalMain;
