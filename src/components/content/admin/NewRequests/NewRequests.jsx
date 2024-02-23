import React, { useState } from 'react';

const NewRequests = () => {
  const [requests, setRequests] = useState([
    { name: 'John Doe', nic: '123456789V', email: 'john@example.com', duration: '3 days' },
    { name: 'Jane Doe', nic: '987654321V', email: 'jane@example.com', duration: '5 days' },
  ]);

  return (
    <div className="flex flex-col gap-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <h2 className="text-xl font-bold">New Requests</h2>
      <hr className="my-2 border-t-2 border-gray-400" />

      {/* Search bar */}
      <input type="text" placeholder="Search..." className="p-2 border border-gray-300 rounded-md" />

      {/* Table */}
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">NIC</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td className="border px-10 py-2">{request.name}</td>
              <td className="border px-4 py-2">{request.nic}</td>
              <td className="border px-4 py-2">{request.email}</td>
              <td className="border px-14 py-2">{request.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Previous</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
      </div>
    </div>
  );
};

export default NewRequests;
