import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReviewRequests from "./ReviewRequestsMain";
import ReviewRequestsMain from "./ReviewRequestsMain";
import { ADMIN_REVIEW_REQUESTS_PATH } from "../../../constant/paths";
import PageHeader from "../../shared/headers/PageHeader";

const NewRequestsMain = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const handleReviewClick = (request) => {
    setSelectedRequest(request);
  };
  
  const [requests, setRequests] = useState([
    {
      name: "John Doe",
      nic: "123456789V",
      email: "john@gmail.com",
      duration: "3 days",
    },
    {
      name: "Jane Doe",
      nic: "997654321V",
      email: "jane@gmail.com",
      duration: "5 days",
    },
    {
      name: "Marie Daines",
      nic: "967654321V",
      email: "marie@gmail.com",
      duration: "9 days",
    },
    {
      name: "Kamal Perera",
      nic: "957654321V",
      email: "kamal@gmail.com",
      duration: "6 days",
    },
    {
      name: "Jack Ahern",
      nic: "927654321V",
      email: "jack@gmail.com",
      duration: "2 days",
    },
    {
      name: "Lee Bradly",
      nic: "917654321V",
      email: "lee@gmail.com",
      duration: "7 days",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const filteredRequests = requests.filter((request) => {
    const searchString =
      `${request.name} ${request.nic} ${request.email} ${request.duration}`.toLowerCase();
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
    setCurrentPage(1); // Reset current page when search query changes
  };

  return (
    <>
      <PageHeader title="New applications" />
      <div className="w-full">
        <div
          className="flex flex-col gap-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {/* Search bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />

          {/* Table */}
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">NIC</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{request.name}</td>
                  <td className="px-4 py-2 border">{request.nic}</td>
                  <td className="px-4 py-2 border">{request.email}</td>
                  <td className="px-4 py-2 border">{request.duration}</td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={ADMIN_REVIEW_REQUESTS_PATH}
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between">
            <div>
              <button
                className="px-4 py-2 mr-2 text-white bg-orange-500 rounded-md"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 text-white bg-orange-500 rounded-md"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
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
