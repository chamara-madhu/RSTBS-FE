import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackArrowIcon from "./../../../assets/icons/back-arrow-3095.svg";

const ReviewRequestsMain = () => {
  const location = useLocation();
  const selectedRequest = location.state?.selectedRequest;

  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <div className="flex items-center">
        <Link to="/admin/new-requests" className="mr-2">
          <img src={BackArrowIcon} alt="BackArrow" style={{ width: "30px", height: "30px" }}/>
        </Link>
        <h2 className="text-xl font-bold">Review Requests</h2>
      </div>
      <hr className="my-2 border-t-2 border-gray-400" />
      <div className="flex flex-col gap-7">
        {selectedRequest && (
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2">Element Name</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Full Name</td>
                <td className="px-4 py-2">{selectedRequest.applicationId.fullName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">NIC</td>
                <td className="px-4 py-2">{selectedRequest.applicationId.nic}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReviewRequestsMain;
