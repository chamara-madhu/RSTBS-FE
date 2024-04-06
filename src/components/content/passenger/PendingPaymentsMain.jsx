import React, { useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import { useEffect } from "react";
import Button from "../../shared/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPendingPaymentInfo,
  uploadBankSlip,
} from "../../../api/applicationAPIs";
import { ArrowLeft } from "feather-icons-react";
import { BOOKING_HISTORY_PATH } from "../../../constant/paths";
import PreLoading from "../../shared/loading/PreLoading";
import SampathBank from "../../../assets/images/sampath.png";
import PeoplesBank from "../../../assets/images/peoples.png";
import BocBank from "../../../assets/images/boc.png";
import ImageUpload from "../../shared/upload/ImageUpload";
import { APPLICATION_STATUSES } from "../../../constant/general";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { seasonTicketOnlinePayment } from "../../../api/seasonTicketAPI";
import pay from "../../../config/stripe";

const banks = [
  {
    img: PeoplesBank,
    accName: "Sri Lanka Railway Department",
    accNo: "017510008154",
    bank: "BOC Bank PLC (7278)",
    branch: "Colombo (175)",
  },
  {
    img: BocBank,
    accName: "Sri Lanka Railway Department",
    accNo: "017510008154",
    bank: "People's Bank PLC (7278)",
    branch: "Colombo (175)",
  },
  {
    img: SampathBank,
    accName: "Sri Lanka Railway Department",
    accNo: "017510008154",
    bank: "Sampath Bank PLC (7278)",
    branch: "Colombo Super (175)",
  },
];

const PendingPaymentsMain = () => {
  const [files, setFiles] = useState({
    bankSlip: null,
    bankSlipErr: "",
  });
  const [data, setData] = useState([]);
  const [showBankDeposits, setShowBankDeposits] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPendingPaymentInfo(id)
      .then((res) => {
        setData(res.data);
        setPreLoading(false);
      })
      .catch((err) => {
        setPreLoading(false);
      });
  }, [id]);

  const handleFile = (name, value) => {
    setFiles((file) => ({
      ...file,
      [name]: value,
      [name + "Err"]: "",
    }));
  };

  const removeImage = (name) => {
    setFiles((file) => ({
      ...file,
      [name]: null,
      [name + "Err"]: "",
    }));
  };

  const uploadPayment = () => {
    setLoadingUpload(true);
    const formData = new FormData();
    formData.set("id", data._id);
    formData.set("status", APPLICATION_STATUSES.PAYMENT_APPROVAL_PENDING);
    formData.append("bankSlip", files.bankSlip);

    uploadBankSlip(formData)
      .then(() => {
        setLoadingUpload(false);
        toast.success("Submission has been successful.");
        navigate("/booking-history");
      })
      .catch((err) => {
        setLoadingUpload(false);
      });
  };

  const handleOnlinePayment = async () => {
    const stripe = await loadStripe(pay.REACT_APP_STEIPE_PUBLISHABLE_KEY);

    seasonTicketOnlinePayment(data?.amount, id)
      .then((res) => {
        stripe.redirectToCheckout({
          sessionId: res.data.sessionId,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PageHeader title="Make your payment" />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="w-full mb-6">
          <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 border-2 border-pp-primary-300 rounded-xl">
            {showBankDeposits ? (
              <>
                <AmountComp id={data._id} amount={data.amount} />
                <div className="flex w-[400px]">
                  <ImageUpload
                    label="Bank slip"
                    name="bankSlip"
                    value={files.bankSlip}
                    existingValue={""}
                    handleFile={handleFile}
                    error={files.bankSlipErr}
                    removeImage={removeImage}
                    showRequiredLabel
                  />
                </div>
                <Button
                  variant="primary"
                  className="w-[400px]"
                  handleButton={uploadPayment}
                  isLoading={loadingUpload}
                >
                  Upload
                </Button>

                <p className="mt-8 text-lg font-medium">Bank account details</p>
                <div className="flex gap-6">
                  {banks.map((bank, i) => (
                    <div
                      className="flex flex-col items-center justify-center"
                      key={i}
                    >
                      <img
                        src={bank.img}
                        alt="bank"
                        className="object-cover h-12 mb-3"
                      />
                      <p className="text-sm">
                        <span className="font-medium">Account Name : </span>
                        {bank.accName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Account No : </span>
                        {bank.accNo}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Bank : </span>
                        {bank.bank}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Branch : </span>
                        {bank.branch}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <AmountComp id={data._id} amount={data.amount} />
                <p className="text-sm font-medium">Select Payment Method</p>
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="primary"
                    className="w-[400px]"
                    handleButton={handleOnlinePayment}
                  >
                    Online payment
                  </Button>
                  <p className="text-xs text-pp-gray-500">
                    Visa, Master, Amex, FriMi, eZ Cash, PayPal, Sampath Vishwa
                    and more.
                  </p>
                </div>
                <p className="text-sm text-pp-gray-500">Or</p>
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="primary"
                    className="w-[400px]"
                    handleButton={() => setShowBankDeposits(true)}
                  >
                    Bank deposit / Transfer
                  </Button>
                  <p className="text-xs text-pp-gray-500">
                    Relevant bank account information will be displayed.
                  </p>
                </div>
              </>
            )}
          </div>
          <Button
            variant="light"
            className="mt-4"
            handleButton={() =>
              showBankDeposits
                ? setShowBankDeposits(false)
                : navigate(BOOKING_HISTORY_PATH)
            }
          >
            <ArrowLeft size={16} /> {showBankDeposits ? "Back" : "Pay later"}
          </Button>
        </div>
      )}
    </>
  );
};

const AmountComp = ({ id, amount }) => {
  return (
    <div className="flex flex-col items-center gap-1 p-6 rounded-lg bg-pp-primary-100">
      <p className="text-sm font-medium text-pp-primary-700">
        Booking ID: {id}
      </p>
      <p className="text-4xl font-bold">Rs. {amount.toFixed(2)}</p>
      <p className="text-sm text-pp-gray-500">Total Due</p>
    </div>
  );
};

export default PendingPaymentsMain;
