import React, { useCallback, useState } from "react";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import PageHeader from "../../shared/headers/PageHeader";
// import Phone from "../../shared/fields/Phone";

const SeasonTicketMain = () => {
  const [form, setForm] = useState({
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  }, []);

  const handlePhone = (value) => {};

  return (
    <div className="relative flex flex-col w-full px-14">
      <PageHeader title="Online Application for Season Ticket" />
      <div className="w-1/2">
        <div className="flex flex-col gap-6">
          <Input
            label="First Name"
            name="fullName"
            value={form.fullName}
            handleChange={handleChange}
            error={form.fullNameErr}
            showRequiredLabel
          />
          <Input
            label="Address"
            name="address"
            value={form.address}
            handleChange={handleChange}
            error={form.addressErr}
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

          {/* <Phone label="Phone" value={form.phone} handlePhone={handlePhone} /> */}

          {/* <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center font-bold">
                <PhoneInput
                  country={"lk"}
                  inputProps={{
                    placeholder: "Enter your phone number",
                    specialLabel: "Phonee",
                  }}
                />
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="station-origin"
              className="text-sm font-bold text-black-900"
            >
              Station Origin
            </label>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="start-date"
              className="text-sm font-bold text-black-900"
            >
              Start date
            </label>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="upload-nic"
              className="text-lg font-medium text-black-900"
            >
              Upload Your NIC
            </label>
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <label
              htmlFor="upload-gn"
              className="text-lg font-medium text-black-900"
            >
              Upload the Grama Niladari Cerification
            </label>
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
            <Button type="submit" variant="light" isLoading={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonTicketMain;
