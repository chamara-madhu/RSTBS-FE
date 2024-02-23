import React, { useState } from 'react';
import Input from "../../../shared/fields/Input";
import Button from '../../../shared/buttons/Button';

const SeasonTicketsTile = () => {
  const [loading, _setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" , padding: "20px"  }}> {/* Add a background color */}
      <h2 className="text-3xl font-bold">Online Application for Season Ticket</h2><br></br>
      <div className="flex flex-col  gap-2">
        <label htmlFor="full-name" className="text-sm font-bold text-black-900">Full Name</label>
        <Input
          type="text"
          name="full-name"
          placeholder="Enter your full name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-sm font-bold text-black-900">Address</label>
        <Input
          type="text"
          name="address"
          placeholder="Enter your address"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="nic" className="text-sm font-bold text-black-900">NIC</label>
        <Input
          type="text"
          name="nic"
          placeholder="Enter your National Identity Card Number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-bold text-black-900">Phone</label>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="station-origin" className="text-sm font-bold text-black-900">Station Origin</label>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="start-date" className="text-sm font-bold text-black-900">Start date</label>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="upload-nic" className="text-lg font-medium text-black-900">Upload Your NIC</label>
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="upload-gn" className="text-lg font-medium text-black-900">Upload the Grama Niladari Cerification</label>
      </div>
      <div className="flex flex-row gap-2 ">
        <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
        >
            Submit for approval
        </Button>
        <Button
            type="submit"
            variant="light"
            isLoading={loading}
        >
            Cancel
        </Button>
      </div>
    </div>
  );
};

export default SeasonTicketsTile;
