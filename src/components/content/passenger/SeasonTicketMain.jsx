import React, { useCallback, useState } from "react";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import PageHeader from "../../shared/headers/PageHeader";
import Phone from "../../shared/fields/Phone";
import TypeOrSelect from "../../shared/fields/TypeOrSelect";
import ImageUpload from "../../shared/upload/ImageUpload";
import { applyForSeasonTicket } from "../../../api/applicationAPIs";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SeasonTicketMain = () => {
  const [files, setFiles] = useState({
    nicFS: null,
    nicBS: null,
    gnCert: null,
    nicFSErr: "",
    nicBSErr: "",
    gnCertErr: "",
  });
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    nic: "",
    contactNumber: "",
    origin: "",
    destination: "",
    start: "",
    end: "",
    fullNameErr: "",
    addressErr: "",
    nicErr: "",
    phoneErr: "",
    originErr: "",
    destinationErr: "",
    startErr: "",
    endErr: "",
    stationsErr: "",
    durationErr: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  }, []);

  const handlePhone = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      phone: value,
      phoneErr: "",
    }));
  };

  const handleFile = (name, value) => {
    setFiles((file) => ({
      ...file,
      [name]: value,
      [name + "Err"]: "",
    }));
  };

  const validate = () => {
    let fullNameErr = "";
    let addressErr = "";
    let nicErr = "";
    let phoneErr = "";
    let originErr = "";
    let destinationErr = "";
    let startErr = "";
    let endErr = "";
    let nicFSErr = "";
    let nicBSErr = "";
    let gnCertErr = "";

    if (!form.fullName) {
      fullNameErr = "Full name is required";
    }

    if (!form.address) {
      addressErr = "Address is required";
    }

    if (!form.nic) {
      nicErr = "NIC is required";
    } else {
      if (!(form.nic.length === 10 || form.nic.length === 12)) {
        nicErr = "Invalid NIC";
      }
    }

    if (!form.phone) {
      phoneErr = "Phone is required";
    } else {
      if (form.phone.length !== 11) {
        phoneErr = "Invalid phone";
      }
    }

    if (!form.origin) {
      originErr = "Station origin is required";
    }

    if (!form.destination) {
      destinationErr = "Station destination is required";
    }

    if (!form.start) {
      startErr = "Station start is required";
    }

    if (!form.end) {
      endErr = "Station end is required";
    }

    if (!files.nicFS) {
      nicFSErr = "NIC front side is required";
    }

    if (!files.nicBS) {
      nicBSErr = "NIC back side is required";
    }

    if (!files.gnCert) {
      gnCertErr = "GN certification is required";
    }

    if (
      nicErr ||
      fullNameErr ||
      addressErr ||
      phoneErr ||
      originErr ||
      destinationErr ||
      startErr ||
      endErr ||
      nicFSErr ||
      nicBSErr ||
      gnCertErr
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        fullNameErr,
        addressErr,
        nicErr,
        phoneErr,
        originErr,
        destinationErr,
        startErr,
        endErr,
      }));

      setFiles((file) => ({
        ...file,
        nicFSErr,
        nicBSErr,
        gnCertErr,
      }));

      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const formData = new FormData();
      formData.set("fullName", form.fullName);
      formData.set("address", form.address);
      formData.set("nic", form.nic);
      formData.set("phone", form.phone);
      formData.set(
        "stations",
        JSON.stringify({
          origin: form.origin,
          destination: form.destination,
        })
      );
      formData.set(
        "duration",
        JSON.stringify({
          start: form.start,
          end: form.end,
        })
      );

      formData.append("nicFS", files.nicFS);
      formData.append("nicBS", files.nicBS);
      formData.append("gnCert", files.gnCert);

      applyForSeasonTicket(formData)
        .then(() => {
          setLoading(false);
          navigate("/booking-history");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const removeImage = (name) => {
    setFiles((file) => ({
      ...file,
      [name]: null,
      [name + "Err"]: "",
    }));
  };

  return (
    <>
      <PageHeader title="Online application for season ticket" />
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
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
              placeholder="E.g. 933110443V / 199315478985"
              showRequiredLabel
            />

            <Phone
              label="Phone"
              value={form.phone}
              handlePhone={handlePhone}
              showRequiredLabel
              error={form.phoneErr}
            />

            <div className="flex items-center flex-auto gap-6">
              <TypeOrSelect
                isClearable
                label="Station origin"
                name="origin"
                // getApi={(name) => CategoryService.getCategoryByName(name)}
                labelClass="tracking-[0.28px] text-pp-gray-700"
                className="flex-1 w-full"
                onChange={handleChange}
                options={[
                  {
                    label: "Kandy",
                    value: "Kandy",
                  },
                ]}
                value={form.origin}
                placeholder="E.g. Kandy"
                error={form.originErr}
                showRequiredLabel
              />
              <TypeOrSelect
                isClearable
                label="Destination origin"
                name="destination"
                // getApi={(name) => CategoryService.getCategoryByName(name)}
                labelClass="tracking-[0.28px] text-pp-gray-700"
                className="flex-1 w-full"
                onChange={handleChange}
                options={[
                  {
                    label: "Colombo",
                    value: "Colombo",
                  },
                ]}
                value={form.destination}
                placeholder="E.g. Colombo"
                error={form.destinationErr}
                showRequiredLabel
              />
            </div>

            <div className="flex items-center flex-auto gap-6">
              <Input
                type="date"
                label="Start date"
                name="start"
                value={form.start}
                min={moment().add(1, "day").format("YYYY-MM-DD")}
                max={moment().add(7, "day").format("YYYY-MM-DD")}
                handleChange={handleChange}
                error={form.startErr}
                showRequiredLabel
              />
              <Input
                type="date"
                label="End date"
                name="end"
                value={form.end}
                min={moment(form.start).add(1, "months").format("YYYY-MM-DD")}
                max={moment(form.start).add(6, "months").format("YYYY-MM-DD")}
                handleChange={handleChange}
                error={form.endErr}
                showRequiredLabel
              />
            </div>

            <div className="flex flex-col">
              <p className="mb-1 font-bold text-md">Upload your NIC</p>
              <p className="mb-4 text-xs text-pp-gray-500">
                Upload the both sides of your NIC
              </p>
              <div className="flex items-center flex-auto gap-6">
                <ImageUpload
                  label="Front side"
                  name="nicFS"
                  value={files.nicFS}
                  existingValue={""}
                  handleFile={handleFile}
                  error={files.nicFSErr}
                  removeImage={removeImage}
                  showRequiredLabel
                />
                <ImageUpload
                  label="Back side"
                  name="nicBS"
                  value={files.nicBS}
                  existingValue={""}
                  handleFile={handleFile}
                  removeImage={removeImage}
                  error={files.nicBSErr}
                  showRequiredLabel
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="mb-1 font-bold text-md">
                Upload the Grama Niladari certification *
              </p>
              <p className="mb-4 text-xs text-pp-gray-500">
                Upload the GN certification here.
              </p>

              <div className="flex items-center flex-auto">
                <ImageUpload
                  name="gnCert"
                  value={files.gnCert}
                  existingValue={form.avatar || ""}
                  handleFile={handleFile}
                  error={files.gnCertErr}
                  height="400px"
                  removeImage={removeImage}
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
        </form>
      </div>
    </>
  );
};

export default SeasonTicketMain;
