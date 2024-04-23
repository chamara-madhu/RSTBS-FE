import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../shared/headers/PageHeader";
import PreLoading from "../../shared/loading/PreLoading";
import Button from "../../shared/buttons/Button";
import Input from "../../shared/fields/Input";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  getRecentSeasonTicket,
  getSeasonTicketFee,
  renewSeasonTicket,
} from "../../../api/seasonTicketAPI";
import { toast } from "react-toastify";

const RenewSeasonTicketMain = () => {
  const [preLoading, setPreLoading] = useState(false);
  const [form, setForm] = useState({
    start: "",
    end: "",
    startErr: "",
    endErr: "",
  });
  const [fee, setFee] = useState(0);
  const [recentEndDate, setRecentEndDate] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [km, setKm] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRecentSeasonTicket()
      .then((res) => {
        console.log("res.data", res.data);
        setKm(res?.data?.km);
        setRecentEndDate(res?.data?.duration?.end);
        setApplicationId(res?.data?.applicationId);
      })
      .catch((err) => {
        console.log(err);
        setPreLoading(false);
      });
  }, []);

  useEffect(() => {
    if (km && form?.start && form?.end) {
      const obj = {
        distance: km,
        start: form.start,
        end: form.end,
      };

      getSeasonTicketFee(obj)
        .then((res) => {
          setFee(Math.round(res.data).toFixed(2));
          setPreLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPreLoading(false);
        });
    }
  }, [form.end, form.start, km]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      [name + "Err"]: "",
    }));
  }, []);

  const validate = () => {
    let startErr = "";
    let endErr = "";

    if (!form.start) {
      startErr = "Station start is required";
    }

    if (!form.end) {
      endErr = "Station end is required";
    }

    if (startErr || endErr) {
      setForm((prevForm) => ({
        ...prevForm,

        startErr,
        endErr,
      }));

      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const data = {
        start: form.start,
        end: form.end,
        amount: fee,
        km,
        applicationId,
      };

      renewSeasonTicket(data)
        .then(() => {
          setLoading(false);
          toast.success(
            "Season ticket has been renewed. Please do the relevant payment."
          );
          navigate("/booking-history");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <PageHeader title="Renew your season ticket" showBack />
      {preLoading ? (
        <PreLoading />
      ) : (
        <div className="relative flex gap-6">
          <div className="w-1/2 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7">
                <div className="flex items-center flex-auto gap-6">
                  <Input
                    type="date"
                    label="Start date"
                    name="start"
                    value={form.start}
                    min={
                      moment() > moment(recentEndDate)
                        ? moment().add(1, "day").format("YYYY-MM-DD")
                        : moment(recentEndDate)
                            .add(1, "day")
                            .format("YYYY-MM-DD")
                    }
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
                    Renew
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
        </div>
      )}
    </>
  );
};

export default RenewSeasonTicketMain;
