import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackArrowIcon from "./../../../assets/icons/back-arrow-3095.svg";
import Button from '../../shared/buttons/Button';
import downloadIcon from "./../../../assets/icons/download.png";

const ReviewRequestsMain = () => {
  const location = useLocation();
  const selectedRequest = location.state?.selectedRequest;

  console.log(selectedRequest);

  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <div className="flex items-center">
        <Link to="/admin/new-requests" className="mr-2">
          <img src={BackArrowIcon} alt="BackArrow" style={{ width: "30px", height: "30px" }} />
        </Link>
        <h2 className="text-xl font-bold">Review Requests</h2>
      </div>
      <hr className="my-2 border-t-2 border-gray-400" />
      <div className="flex flex-col gap-7">
        {selectedRequest && (
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Element Name</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-left">Full Name</td>
                <td className="px-4 py-2 text-left">{selectedRequest.applicationId.fullName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">NIC</td>
                <td className="px-4 py-2 text-left">{selectedRequest.applicationId.nic}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Station Origin</td>
                <td className="px-4 py-2 text-left">{selectedRequest.applicationId.stations.origin}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Station Destination</td>
                <td className="px-4 py-2 text-left">{selectedRequest.applicationId.stations.destination}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Duration</td>
                <td className="px-4 py-2 text-left">{selectedRequest.applicationId.duration}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Amount</td>
                <td className="px-4 py-2 text-left">{selectedRequest.amount}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="flex flex-row gap-6 mt-4">
        <Button
          type="submit"
          variant="light"
          className="bg-gray-100 text-blue-800 border border-blue-900 px-4 py-2 rounded transition duration-300"
        // isLoading={loading}
        >
          Download NIC images
          <img src={downloadIcon} alt="Download" className="w-5 h-5" />
        </Button>
        <Button type="submit" variant="light"
          // isLoading={loading}
          className="bg-gray-100 text-blue-800 border border-blue-900 px-4 py-2 rounded transition duration-300"
        >
          Download GN Certificate
          <img src={downloadIcon} alt="Download" className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-row gap-6 mt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-[300px]"
        // isLoading={loading}
        >
          Accept Request
        </Button>
        <Button type="submit" variant="dark"
          // isLoading={loading}
          className="w-[300px]"
        >
          Reject Request
        </Button>
      </div>
    </div>
  );
};

export default ReviewRequestsMain;
