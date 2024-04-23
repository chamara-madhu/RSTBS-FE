import React, { useEffect, useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import moment from "moment";
import { getAllSeasonTickets } from "../../../api/seasonTicketAPI";
import { APPLICATION_STATUSES } from "../../../constant/general";

const AllSeasonTicketsMain = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newApplications, setNewApplications] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    getAllSeasonTickets()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const filteredRequests = data.filter((request) => {
    const searchString =
      `${request._id}  ${request.applicationId.fullName} ${request.applicationId.nic} ${request.applicationId.stations.origin} ${request.applicationId.stations.destination} ${request.duration} ${request.amount}`.toLowerCase();
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

  const getStatus = (status) => {
    switch (status) {
      case APPLICATION_STATUSES.APPLICATION_PENDING:
        return "Pending";
      case APPLICATION_STATUSES.PAYMENT_PENDING:
        return "Pending payment";
      case APPLICATION_STATUSES.PAYMENT_APPROVAL_PENDING:
        return "Pending approval payment";
      case APPLICATION_STATUSES.APPLICATION_REJECTED:
        return "Application rejected";
      case APPLICATION_STATUSES.ACTIVE:
        return "Active";
      case APPLICATION_STATUSES.PAYMENT_REJECTED:
        return "Payment rejected";
      default:
        return "Expired";
    }
  };

  return (
    <>
      <PageHeader title="All season tickets" />
      <div className="w-full" data-testid="all-new-applications-main">
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
                  <th className="px-4 font-medium border">Season ticket ID</th>
                  <th className="px-4 font-medium border">Name</th>
                  <th className="px-4 font-medium border">NIC</th>
                  <th className="px-4 font-medium border">
                    Origin - destination stations
                  </th>
                  <th className="px-4 font-medium border">
                    Start - end duration
                  </th>
                  <th className="px-4 font-medium border">Amount (Rs.)</th>
                  <th className="px-4 font-medium border">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((ticket, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{ticket._id}</td>
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
                      {getStatus(ticket.status)}
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
          <p className="text-sm">No records</p>
        )}
      </div>
    </>
  );
};

export default AllSeasonTicketsMain;
