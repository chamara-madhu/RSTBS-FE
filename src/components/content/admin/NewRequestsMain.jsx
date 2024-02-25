import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../shared/headers/PageHeader";
import { ADMIN_REVIEW_REQUESTS_PATH } from "../../../constant/paths";
import { getAllPendingApplications } from "../../../api/allPendingApplications";

const NewRequestsMain = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPendingApplications()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const filteredRequests = data.filter((request) => {
    const searchString = `${request.applicationId.fullName} ${request.applicationId.nic} ${request.applicationId.stations.origin} ${request.applicationId.stations.destination} ${request.duration} ${request.amount}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRequests.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleReviewClick = (request) => {
    setSelectedRequest(request);
    navigate(ADMIN_REVIEW_REQUESTS_PATH, { state: { selectedRequest: request } });
  };

  return (
    <>
      <PageHeader title="New applications" />
      <div className="w-full">
        <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />

          <table className="table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">NIC</th>
                <th className="px-4 py-2">Origin Station</th>
                <th className="px-4 py-2">Destination Station</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{request.applicationId.fullName}</td>
                  <td className="px-4 py-2 border">{request.applicationId.nic}</td>
                  <td className="px-4 py-2 border">{request.applicationId.stations.origin}</td>
                  <td className="px-4 py-2 border">{request.applicationId.stations.destination}</td>
                  <td className="px-4 py-2 border">{request.duration}</td>
                  <td className="px-4 py-2 border">{request.amount}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleReviewClick(request)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between">
            <div>
              <button className="px-4 py-2 mr-2 text-white bg-orange-500 rounded-md" onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="px-4 py-2 text-white bg-orange-500 rounded-md" onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRequestsMain;
