import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../shared/headers/PageHeader";
import { ADMIN_REVIEW_PAYMENT_APPROVAL_PATH } from "../../../constant/paths";
import { getAllPendingPaymentApprovals } from "../../../api/applicationAPIs";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import moment from "moment";

const PendingPaymentApprovalsMain = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newApplications, setNewApplications] = useState(1);
  const recordsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    getAllPendingPaymentApprovals()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  console.log({ data });

  const filteredRequests = data.filter((request) => {
    const searchString =
      `${request.applicationId.fullName} ${request.applicationId.nic} ${request.applicationId.stations.origin} ${request.applicationId.stations.destination} ${request.duration} ${request.amount}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRequests.length / recordsPerPage);
  const startIndex = (newApplications - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const nextPage = () => {
    setNewApplications(newApplications + 1);
  };

  const prevPage = () => {
    setNewApplications(newApplications - 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setNewApplications(1);
  };

  const handleReviewClick = (id) => {
    navigate(`${ADMIN_REVIEW_PAYMENT_APPROVAL_PATH.replace(":id", id)}`);
  };

  return (
    <>
      <PageHeader title="Pending payment approvals" />
      <div className="w-full">
        {data.length > 0 ? (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
            />

            <table className="table-fixed">
              <thead className="h-14">
                <tr className="text-sm text-left">
                  <th className="px-4 font-medium border">Name</th>
                  <th className="px-4 font-medium border">NIC</th>
                  <th className="px-4 font-medium border">
                    Origin - destination stations
                  </th>
                  <th className="px-4 font-medium border">
                    Start - end duration
                  </th>
                  <th className="px-4 font-medium border">Amount (Rs.)</th>
                  <th className="px-4 font-medium border"></th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((ticket, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      {ticket.applicationId.fullName}
                    </td>
                    <td className="px-4 py-2 border">
                      {ticket.applicationId.nic}
                    </td>
                    <td className="px-4 py-2 border">
                      {ticket.applicationId.stations.origin} to{" "}
                      {ticket.applicationId.stations.destination}
                    </td>
                    <td className="px-4 py-2 border">{`${moment
                      .utc(ticket.duration.start)
                      .local()
                      .format("DD MMM YYYY")} - ${moment
                      .utc(ticket.duration.end)
                      .local()
                      .format("DD MMM YYYY")}`}</td>
                    <td className="px-4 py-2 border">
                      {ticket.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border">
                      <Button
                        variant="primary"
                        handleButton={() => handleReviewClick(ticket._id)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="light"
                    handleButton={prevPage}
                    disabled={newApplications === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="light"
                    handleButton={nextPage}
                    disabled={newApplications === totalPages}
                  >
                    Next
                  </Button>
                </div>
                <span>{`Page ${newApplications} of ${totalPages}`}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm">No pending payment approvals</p>
        )}
      </div>
    </>
  );
};

export default PendingPaymentApprovalsMain;
