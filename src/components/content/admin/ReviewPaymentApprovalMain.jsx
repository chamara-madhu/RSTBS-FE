import React, { useEffect, useState } from "react";
import { Check, X } from "feather-icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/buttons/Button";
import {
  acceptOrRejectPayment,
  getAnPendingPaymentApproval,
} from "../../../api/applicationAPIs";
import PageHeader from "../../shared/headers/PageHeader";
import config from "../../../config/api";
import PreLoading from "../../shared/loading/PreLoading";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { ADMIN_PENDING_PAYMENT_APPROVALS_PATH } from "../../../constant/paths";
import PaymentRejectionModal from "./modals/PaymentRejectionModal";
import { toast } from "react-toastify";

const ReviewPaymentApprovalMain = () => {
  const [data, setData] = useState(null);
  const [isOpenRejectionModal, setIsOpenRejectionModal] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(false);
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

  const acceptPayment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this payment?"
    );

    if (confirmed) {
      setLoadingAccept(true);

      acceptOrRejectPayment(id, APPLICATION_STATUSES.ACTIVE, null)
        .then(() => {
          setLoadingAccept(false);
          toast.success("Payment has been approved.");
          navigate(ADMIN_PENDING_PAYMENT_APPROVALS_PATH);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoadingAccept(false);
        });
    }
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
                    <td className="py-2 font-medium text-left">
                      Season Ticket ID
                    </td>
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
            <div className="flex flex-row gap-2 mt-6">
              <Button
                type="submit"
                variant="primary"
                className="w-[150px]"
                isLoading={loadingAccept}
                handleButton={() => acceptPayment(data._id)}
              >
                <Check size={16} /> Accept
              </Button>
              <Button
                type="submit"
                variant="danger"
                className="w-[150px]"
                handleButton={() => setIsOpenRejectionModal(true)}
              >
                <X size={16} /> Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      <PaymentRejectionModal
        isOpenRejectionModal={isOpenRejectionModal}
        setIsOpenRejectionModal={setIsOpenRejectionModal}
        id={data?._id}
      />
    </>
  );
};

export default ReviewPaymentApprovalMain;
