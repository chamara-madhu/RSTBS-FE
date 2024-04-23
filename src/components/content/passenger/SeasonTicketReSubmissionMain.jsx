import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import PageHeader from "../../shared/headers/PageHeader";
import Phone from "../../shared/fields/Phone";
import TypeOrSelect from "../../shared/fields/TypeOrSelect";
import ImageUpload from "../../shared/upload/ImageUpload";
import { reSubmitApplication } from "../../../api/applicationAPIs";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import PreLoading from "../../shared/loading/PreLoading";
import config from "../../../config/api";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Directions from "./Directions";
import { getSeasonTicket } from "../../../api/seasonTicketAPI";
import { getAllStations } from "../../../api/stationAPI";
import { toast } from "react-toastify";

const SeasonTicketReSubmissionMain = () => {
  const [preLoading, setPreLoading] = useState(true);
  const [files, setFiles] = useState({
    nicFS: null,
    nicFSUrl: null,
    nicBS: null,
    nicBSUrl: null,
    gnCert: null,
    gnCertUrl: null,
    nicFSErr: "",
    nicBSErr: "",
    gnCertErr: "",
  });
  const [form, setForm] = useState({
    applicationId: "",
    seasonTicketId: "",
    fullName: "",
    address: "",
    nic: "",
    phone: "",
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
  const [fee, setFee] = useState(0);
  const [km, setKm] = useState(0);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllStations()
      .then((res) => {
        setStations(
          res.data.map((el) => {
            return {
              label: el.station,
              value: el.station,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSeasonTicket(id)
      .then((res) => {
        setForm((prevForm) => ({
          ...prevForm,
          applicationId: res.data.applicationId._id,
          seasonTicketId: res.data._id,
          fullName: res.data.applicationId.fullName,
          address: res.data.applicationId.address,
          nic: res.data.applicationId.nic,
          phone: res.data.applicationId.phone,
          origin: res.data.applicationId.stations.origin,
          destination: res.data.applicationId.stations.destination,
          start: moment
            .utc(res.data.duration.start)
            .local()
            .format("YYYY-MM-DD"),
          end: moment.utc(res.data.duration.end).local().format("YYYY-MM-DD"),
        }));
        setFiles((file) => ({
          ...file,
          nicFSUrl: `${config.S3_PUBLIC_URL}/${res?.data?.applicationId?.nicImages?.fs}`,
          nicBSUrl: `${config.S3_PUBLIC_URL}/${res?.data?.applicationId?.nicImages?.bs}`,
          gnCertUrl: `${config.S3_PUBLIC_URL}/${res?.data?.applicationId?.gnCertificate}`,
        }));
        setFee(res.data.amount);
        setPreLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPreLoading(false);
      });
  }, [id]);

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
    } else if (form.origin === form.destination) {
      originErr = "Invalid stations";
    }

    if (!form.destination) {
      destinationErr = "Station destination is required";
    } else if (form.origin === form.destination) {
      destinationErr = "Invalid stations";
    }

    if (!form.start) {
      startErr = "Station start is required";
    }

    if (!form.end) {
      endErr = "Station end is required";
    }

    if (!files.nicFSUrl && !files.nicFS) {
      nicFSErr = "NIC front side is required";
    }

    if (!files.nicBSUrl && !files.nicBS) {
      nicBSErr = "NIC back side is required";
    }

    if (!files.gnCertUrl && !files.gnCert) {
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
      formData.set("applicationId", form.applicationId);
      formData.set("seasonTicketId", form.seasonTicketId);
      formData.set("fullName", form.fullName);
      formData.set("address", form.address);
      formData.set("nic", form.nic);
      formData.set("phone", form.phone);
      formData.set("origin", form.origin);
      formData.set("destination", form.destination);
      formData.set("start", form.start);
      formData.set("end", form.end);
      formData.set("amount", fee);
      formData.set("km", km);
      if (files?.nicFS) {
        formData.append("nicFS", files.nicFS);
      }
      if (files?.nicBS) {
        formData.append("nicBS", files.nicBS);
      }
      if (files?.gnCert) {
        formData.append("gnCert", files.gnCert);
      }

      reSubmitApplication(formData)
        .then(() => {
          setLoading(false);
          toast.success("Application has been re-submitted.");
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
      [name + "Url"]: null,
      [name + "Err"]: "",
    }));
  };

  return (
    <>
      <PageHeader title="Application Re-submission" showBack />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div
          className="relative flex gap-6"
          data-testid="season-ticket-resubmission-main"
        >
          <div className="w-1/2 mb-6">
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
                    labelClass="tracking-[0.28px] text-pp-gray-700"
                    className="flex-1 w-full"
                    onChange={handleChange}
                    options={stations}
                    value={form.origin}
                    placeholder="E.g. Kandy"
                    error={form.originErr}
                    showRequiredLabel
                  />
                  <TypeOrSelect
                    isClearable
                    label="Destination origin"
                    name="destination"
                    labelClass="tracking-[0.28px] text-pp-gray-700"
                    className="flex-1 w-full"
                    onChange={handleChange}
                    options={stations}
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
                    min={moment(form.start)
                      .add(1, "months")
                      .format("YYYY-MM-DD")}
                    max={moment(form.start)
                      .add(6, "months")
                      .format("YYYY-MM-DD")}
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
                      existingValue={files.nicFSUrl}
                      handleFile={handleFile}
                      error={files.nicFSErr}
                      removeImage={removeImage}
                      showRequiredLabel
                    />
                    <ImageUpload
                      label="Back side"
                      name="nicBS"
                      value={files.nicBS}
                      existingValue={files.nicBSUrl}
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
                      existingValue={files.gnCertUrl}
                      handleFile={handleFile}
                      error={files.gnCertErr}
                      height="400px"
                      removeImage={removeImage}
                    />
                  </div>
                </div>

                {km && (
                  <div>
                    <p className="text-lg font-semibold">
                      Season ticket details
                    </p>
                    <p className="text-sm">Distance in km: {km} km</p>
                    {form.start && form.end ? (
                      <p className="text-sm">
                        No of days:{" "}
                        {moment(form.end).diff(moment(form.start), "days")} days
                      </p>
                    ) : null}
                  </div>
                )}

                <div>
                  <p className="text-lg font-semibold">Season ticket fee</p>
                  <p className="text-sm">LKR. {fee}</p>
                </div>

                <div className="flex flex-row gap-2 mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-[200px]"
                    isLoading={loading}
                  >
                    Re-submit for approval
                  </Button>
                  <Button
                    type="submit"
                    variant="light"
                    handleButton={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div
            className="sticky top-[173px] w-1/2 mb-6 bg-gray-200 h-screen"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <APIProvider apiKey="AIzaSyDmwNFfvv3ClUoYkxeYNi372U5-zB6uY70">
              {/* {google.GOOGLE_API_KEY}> */}
              <Map
                defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
                defaultZoom={9}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                <Directions
                  origin={form.origin}
                  destination={form.destination}
                  start={form.start}
                  end={form.end}
                  setFee={setFee}
                  km={km}
                  setKm={setKm}
                />
              </Map>
            </APIProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default SeasonTicketReSubmissionMain;
