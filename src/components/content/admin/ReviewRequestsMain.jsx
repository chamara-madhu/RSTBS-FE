import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BackArrowIcon from "./../../../assets/icons/back-arrow-3095.svg";
import Input from '../../shared/fields/Input';

const ReviewRequestsMain = () => {
  const [form, setForm] = useState({
    phone: "",
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  }, []);

  return (
    <div className="flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px" }}>
      <div className="flex items-center">
        <Link to="/admin/new-requests" className="mr-2">
          <img src={BackArrowIcon} alt="BackArrow" style={{ width: "30px", height: "30px" }}/>
        </Link>
        <h2 className="text-xl font-bold">Review Requests</h2>
      </div>
      <hr className="my-2 border-t-2 border-gray-400" />
      {/* <div className="w-1/2"> */}
        <div className="flex flex-col gap-7">
          <Input
            label="First name"
            name="fullName"
            value={form.fullName}
            handleChange={handleChange}
            error={form.fullNameErr}
            showRequiredLabel
          />
          <Input
            label="NIC number"
            name="nic"
            value={form.nic}
            handleChange={handleChange}
            error={form.nicErr}
            showRequiredLabel
          />

        </div>
        </div>

    // </div>
  );
};

export default ReviewRequestsMain;
