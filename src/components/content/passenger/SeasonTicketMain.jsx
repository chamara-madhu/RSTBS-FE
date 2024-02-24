import React, { useCallback, useState } from "react";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import PageHeader from "../../shared/headers/PageHeader";
import Phone from "../../shared/fields/Phone";
import TypeOrSelect from "../../shared/fields/TypeOrSelect";
import ImageUpload from "../../shared/upload/ImageUpload";

const SeasonTicketMain = () => {
  const [file, setFile] = useState(null);
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
    <div className="relative flex flex-col w-full px-14 mb-10">
      <PageHeader title="Online application for season ticket" />
      <div className="w-1/2">
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

          <Phone
            label="Phone"
            value={form.phone}
            handlePhone={handlePhone}
            showRequiredLabel
          />

          <div className="flex gap-6 items-center flex-auto">
            <TypeOrSelect
              isClearable
              label="Station origin"
              name="category"
              // getApi={(name) => CategoryService.getCategoryByName(name)}
              labelClass="tracking-[0.28px] text-pp-gray-700"
              className="flex-1 w-full"
              onChange={handleChange}
              options={[]}
              value={form.category}
              placeholder="E.g. Kandy"
              showRequiredLabel
            />
            <TypeOrSelect
              isClearable
              label="Destination origin"
              name="category"
              // getApi={(name) => CategoryService.getCategoryByName(name)}
              labelClass="tracking-[0.28px] text-pp-gray-700"
              className="flex-1 w-full"
              onChange={handleChange}
              options={[]}
              value={form.category}
              placeholder="E.g. Colombo"
              showRequiredLabel
            />
          </div>

          <div className="flex gap-6 items-center flex-auto">
            <Input
              type="date"
              label="Start date"
              name="nic"
              value={form.nic}
              handleChange={handleChange}
              error={form.nicErr}
              showRequiredLabel
            />
            <Input
              type="date"
              label="End date"
              name="nic"
              value={form.nic}
              handleChange={handleChange}
              error={form.nicErr}
              showRequiredLabel
            />
          </div>

          <div className="flex flex-col">
            <p className="text-md font-bold mb-1">Upload Your NIC</p>
            <p className="text-xs text-pp-gray-500 mb-4">
              Upload the both sides of your NIC
            </p>
            <div className="flex gap-6 items-center flex-auto">
              <ImageUpload
                label="Front side"
                value={file}
                existingValue={form.avatar || ""}
                setFile={setFile}
                // deleteImage={deleteImage}
                showRequiredLabel
              />
              <ImageUpload
                label="Back side"
                value={file}
                existingValue={form.avatar || ""}
                setFile={setFile}
                // deleteImage={deleteImage}
                showRequiredLabel
              />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-md font-bold mb-1">
              Upload the Grama Niladari Certification *
            </p>
            <p className="text-xs text-pp-gray-500 mb-4">
              Upload the GN certification here.
            </p>

            <div className="flex items-center flex-auto">
              <ImageUpload
                value={file}
                existingValue={form.avatar || ""}
                setFile={setFile}
                // deleteImage={deleteImage}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 mt-4">
            <Button
              type="submit"
              variant="dark"
              className="w-[200px]"
              isLoading={loading}
            >
              Submit for approval
            </Button>
            {/* <Button type="submit" variant="light" isLoading={loading}>
              Cancel
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonTicketMain;
