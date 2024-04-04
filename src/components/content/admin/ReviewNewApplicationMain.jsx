import React, { useEffect, useState } from "react";
import moment from "moment";
import { Check, X } from "feather-icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/buttons/Button";
import {
  acceptOrRejectApplication,
  getAnPendingApplication,
} from "../../../api/applicationAPIs";
import PageHeader from "../../shared/headers/PageHeader";
import config from "../../../config/api";
import PreLoading from "../../shared/loading/PreLoading";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { ADMIN_NEW_APPLICATIONS_PATH } from "../../../constant/paths";
import ApplicationRejectionModal from "./modals/ApplicationRejectionModal";
import { toast } from "react-toastify";

const ReviewNewApplicationMain = () => {
  const [data, setData] = useState(null);
  const [isOpenRejectionModal, setIsOpenRejectionModal] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAnPendingApplication(id)
      .then((res) => {
        setData(res.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPreLoading(false);
      });
  }, [id]);

  const acceptApplication = (id) => {
    setLoadingAccept(true);

    acceptOrRejectApplication(id, APPLICATION_STATUSES.PAYMENT_PENDING, null)
      .then(() => {
        setLoadingAccept(false);
        toast.success("Application has been approved.");
        navigate(ADMIN_NEW_APPLICATIONS_PATH);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoadingAccept(false);
      });
  };

  return (
    <>
      <PageHeader title="Review application" showBack />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="relative flex w-full gap-6 mb-6" data-testid="review-new-application-main">
          <div style={{ width: "calc(100% - 400px)" }}>
            {data && (
              <table className="table-fixed">
                <tbody className="text-sm">
                  <tr>
                    <td className="py-2 font-medium text-left">Full name</td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">NIC</td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.nic}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Address</td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Phone</td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">
                      Station origin
                    </td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.stations.origin}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">
                      Station destination
                    </td>
                    <td className="px-4 py-2 text-left">
                      {data.applicationId.stations.destination}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Start date</td>
                    <td className="px-4 py-2 text-left">
                      {moment
                        .utc(data.duration.start)
                        .local()
                        .format("DD MMM YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">End date</td>
                    <td className="px-4 py-2 text-left">
                      {moment
                        .utc(data.duration.end)
                        .local()
                        .format("DD MMM YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">
                      Amount (LKR.)
                    </td>
                    <td className="px-4 py-2 text-left">
                      {data.amount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <p className="my-3 text-sm font-medium">GN certificate</p>
            <img
              src={`${config.S3_PUBLIC_URL}/${data?.applicationId?.gnCertificate}`}
              alt="NIC front side"
              className="w-full border rounded-xl"
            />
            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-[150px]"
                isLoading={loadingAccept}
                handleButton={() => acceptApplication(data._id)}
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
          <div className="sticky top-[173px] flex flex-col gap-4 w-[400px] h-screen">
            <img
              src={`${config.S3_PUBLIC_URL}/${data?.applicationId?.nicImages?.fs}`}
              alt="NIC front side"
              className="w-full border rounded-xl"
            />
            <img
              src={`${config.S3_PUBLIC_URL}/${data?.applicationId?.nicImages?.bs}`}
              alt="NIC front side"
              className="w-full border rounded-xl"
            />
          </div>
        </div>
      )}

      <ApplicationRejectionModal
        isOpenRejectionModal={isOpenRejectionModal}
        setIsOpenRejectionModal={setIsOpenRejectionModal}
        id={data?._id}
      />
    </>
  );
};

export default ReviewNewApplicationMain;
