import React from 'react';
import { Link } from 'react-router-dom';

const ReviewRequestsMain = () => {
  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <div className="flex items-center">
        <Link to="/admin/new-requests" className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h2 className="text-xl font-bold">Review Requests</h2>
      </div>
      <hr className="my-2 border-t-2 border-gray-400" />
    </div>
  );
};

export default ReviewRequestsMain;
