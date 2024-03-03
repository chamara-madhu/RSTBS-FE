import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import PendingPaymentApprovalsMain from "../../components/content/admin/PendingPaymentApprovalsMain";

const PendingPaymentApprovals = () => {
  return (
    <AdminLayout>
      <PendingPaymentApprovalsMain />
    </AdminLayout>
  );
};

export default PendingPaymentApprovals;
