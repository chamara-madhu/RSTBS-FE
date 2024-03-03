import React from "react";
import PassengerLayout from "../../components/layouts/PassengerLayout";
import PendingPaymentsMain from "../../components/content/passenger/PendingPaymentsMain";

const PendingPayments = () => {
  return (
    <PassengerLayout>
      <PendingPaymentsMain />
    </PassengerLayout>
  );
};

export default PendingPayments;
