import React, { useCallback, useEffect, useState } from "react";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import PageHeader from "../../shared/headers/PageHeader";
import Phone from "../../shared/fields/Phone";
import TypeOrSelect from "../../shared/fields/TypeOrSelect";
import ImageUpload from "../../shared/upload/ImageUpload";
import { submitApplication } from "../../../api/applicationAPIs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getUserQR } from "../../../api/userAPI";
import PreLoading from "../../shared/loading/PreLoading";
import config from "../../../config/api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Directions from "./Directions";
import { getSeasonTicketHistory } from "../../../api/seasonTicketAPI";
import { getAllStations } from "../../../api/stationAPI";
import { Download } from "feather-icons-react";
import html2PDF from "jspdf-html2canvas";
import { toast } from "react-toastify";

const SeasonTicketMain = () => {
  const [qr, setQr] = useState(null);
  const [user, setUser] = useState(null);
  const [seasonTicketHistory, setSeasonTicketHistory] = useState(null);
  const [preLoading, setPreLoading] = useState(true);
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
  const navigate = useNavigate();

  console.log({ user });
  console.log({ qr });

  useEffect(() => {
    Promise.all([getUserQR(), getSeasonTicketHistory()])
      .then(([userRes, seasonTicketRes]) => {
        setUser(userRes.data);
        setSeasonTicketHistory(seasonTicketRes.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPreLoading(false); // Make sure preLoading is set to false even if there's an error
      });
  }, []);

  useEffect(() => {
    if (user?.qr) {
      // Fetch the remote file as blob
      fetch(`${config.S3_PUBLIC_URL}/${user.qr}`)
        .then((response) => response.blob())
        .then((blob) => {
          // Now 'blob' contains the content of the remote file as a Blob
          console.log(blob);
          setQr(blob);
        })
        .catch((error) => console.error("Error fetching the file:", error));
    }
  }, [user?.qr]);

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
      formData.set("origin", form.origin);
      formData.set("destination", form.destination);
      formData.set("start", form.start);
      formData.set("end", form.end);
      formData.set("amount", fee);
      formData.set("km", km);
      formData.append("nicFS", files.nicFS);
      formData.append("nicBS", files.nicBS);
      formData.append("gnCert", files.gnCert);

      submitApplication(formData)
        .then(() => {
          setLoading(false);
          toast.success("Application has been submitted for approval.");
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

  const handleDownload = () => {
    setLoading(true);

    const node = document.getElementById("my-node");

    html2PDF(node, {
      jsPDF: {
        format: "a6",
      },
      imageType: "image/jpeg",
      output: "./pdf/generate.pdf",
    });

    setLoading(false);
  };

  return (
    <>
      <PageHeader
        title={
          user?.qr ? "Your QR code" : "Online application for season ticket"
        }
      />
      {preLoading ? (
        <PreLoading />
      ) : user?.qr && qr ? (
        <div
          className="flex w-full gap-4 mb-6"
          data-testid="season-ticket-main"
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <div
              className="flex flex-col items-center justify-center gap-4 w-[340px] border rounded-lg p-5"
              id="my-node"
            >
              <img
                src={URL.createObjectURL(qr)}
                alt="QR"
                className="w-[300px] border rounded-lg"
              />
              <p className="text-lg font-medium text-center">
                Neluwe Liyanage Chamara Madhushanka Gunathilaka
              </p>
              <p className="text-sm text-center">933110443V</p>
            </div>

            <Button
              type="submit"
              variant="dark"
              className="w-[200px]"
              isLoading={loading}
              handleButton={handleDownload}
            >
              <Download size={16} /> Download
            </Button>
          </div>
          <div>
            {user?.nic && (
              <table className="table-fixed">
                <tbody className="text-sm">
                  <tr>
                    <td className="py-2 font-medium text-left">Full name</td>
                    <td className="px-4 py-2 text-left">{user.fullName}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">NIC</td>
                    <td className="px-4 py-2 text-left">{user.nic}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Address</td>
                    <td className="px-4 py-2 text-left">{user.address}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">Phone</td>
                    <td className="px-4 py-2 text-left">{user.phone}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">
                      Station origin
                    </td>
                    <td className="px-4 py-2 text-left">
                      {user.stations.origin}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-left">
                      Station destination
                    </td>
                    <td className="px-4 py-2 text-left">
                      {user.stations.destination}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : seasonTicketHistory?.length > 0 ? (
        <p>Your application is in progress.</p>
      ) : (
        <div className="relative flex gap-6">
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
                    Submit for approval
                  </Button>
                  {/* <Button type="submit" variant="light" isLoading={loading}>
              Cancel
            </Button> */}
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

export default SeasonTicketMain;
