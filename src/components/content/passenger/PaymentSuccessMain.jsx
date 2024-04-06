import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PreLoading from "../../shared/loading/PreLoading";
import { activateSeasonTicket } from "../../../api/seasonTicketAPI";
import { BOOKING_HISTORY_PATH } from "../../../constant/paths";
import { toast } from "react-toastify";

const PaymentSuccessMain = () => {
  const [preLoading, setPreLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    activateSeasonTicket(id)
      .then((res) => {
        setPreLoading(false);
        navigate(BOOKING_HISTORY_PATH);
        toast.success("Successful payment. Your season ticket is now active.");
      })
      .catch((err) => {
        setPreLoading(false);
      });
  }, [id, navigate]);

  return (
    <>{preLoading ? <PreLoading /> : <div className="w-full mb-6"></div>}</>
  );
};

export default PaymentSuccessMain;
