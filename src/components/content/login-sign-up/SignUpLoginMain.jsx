import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBg from "../../../assets/images/main-bg.webp";
import Input from "../../shared/fields/Input";
import Button from "../../shared/buttons/Button";
import { loginAPI, signUpAPI, verifyOtpAPI } from "../../../api/authAPIs";
import { isValidEmail } from "../../../utils/general";

const SignUpLoginMain = () => {
  const [showSignUpView, setShowSignUpView] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    otp: "",
    fNameErr: "",
    lNameErr: "",
    emailErr: "",
    otpErr: "",
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

  const validateLogin = () => {
    let emailErr = "";

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    if (emailErr) {
      setForm((prevForm) => ({
        ...prevForm,
        emailErr,
      }));

      return false;
    }

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      setLoading(true);

      const data = {
        email: form.email,
      };

      loginAPI(data)
        .then(() => {
          setShowOtpView(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const validateOtp = () => {
    let otpErr = "";

    if (!form.otp) {
      otpErr = "otp is required";
    }

    if (otpErr) {
      setForm((prevForm) => ({
        ...prevForm,
        otpErr,
      }));

      return false;
    }

    return true;
  };

  const handleOTP = (e) => {
    e.preventDefault();
    if (validateOtp()) {
      setLoading(true);

      const data = {
        email: form.email,
        otp: form.otp,
      };

      verifyOtpAPI(data)
        .then((res) => {
          console.log(res.data);
          // props.storeUserDetails(res.data.user);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("user_data", JSON.stringify(res.data.user));
          setLoading(false);
          if (res.data.user.role === 0) {
            navigate("/admin/new-applications");
          } else {
            navigate("/season-ticket");
          }
        })
        .catch((err) => {
          if (err.response.data.code === 1100) {
            setForm((prevForm) => ({
              ...prevForm,
              otpErr: err.response.data.message,
            }));
          }
          setLoading(false);
        });
    }
  };

  const validateInSignUp = () => {
    let fNameErr = "";
    let lNameErr = "";
    let emailErr = "";

    if (!form.fName) {
      fNameErr = "First name is required";
    }

    if (!form.lName) {
      lNameErr = "Last name is required";
    }

    if (!form.email) {
      emailErr = "Email is required";
    } else if (!isValidEmail(form.email)) {
      emailErr = "Email is invalid";
    }

    if (emailErr || fNameErr || lNameErr) {
      setForm((prevForm) => ({
        ...prevForm,
        fNameErr,
        lNameErr,
        emailErr,
      }));

      return false;
    }

    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateInSignUp()) {
      setLoading(true);

      const data = {
        fName: form.fName,
        lName: form.lName,
        email: form.email,
      };

      signUpAPI(data)
        .then((res) => {
          setShowOtpView(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data.code === 1100) {
            setForm((prevForm) => ({
              ...prevForm,
              emailErr: err.response.data.message,
            }));
          }
          setLoading(false);
        });
    }
  };

  const handleBack = () => {
    setShowOtpView(false);
    setForm((prevForm) => ({
      ...prevForm,
      otp: "",
      otpErr: "",
    }));
  };

  return (
    <div className="flex w-full h-full" data-testid="signup-login-main">
      <div className="flex w-1/2 h-[100vh]">
        <img
          src={MainBg}
          alt="main bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex w-1/2 h-[100vh] items-center justify-center">
        <div className="flex flex-col w-full sm:w-[320] max-w-[320px]">
          <p className="text-2xl">Railway Season Ticket</p>
          <p className="mb-10 text-4xl font-bold">Booking System</p>

          {!showOtpView ? (
            <form
              className="flex flex-col gap-6"
              onSubmit={showSignUpView ? handleSignUp : handleLogin}
            >
              {showSignUpView && (
                <>
                  <Input
                    label="First Name"
                    name="fName"
                    value={form.fName}
                    handleChange={handleChange}
                    error={form.fNameErr}
                  />
                  <Input
                    label="Last name"
                    name="lName"
                    value={form.lName}
                    handleChange={handleChange}
                    error={form.lNameErr}
                  />
                </>
              )}
              <Input
                label="Email"
                name="email"
                value={form.email}
                handleChange={handleChange}
                error={form.emailErr}
                info="An OTP will be sent to you"
              />
              <div>
                <Button
                  type="submit"
                  variant="dark"
                  className="w-full"
                  isLoading={loading}
                >
                  {showSignUpView ? "Sign up" : "Login"}
                </Button>
                {showSignUpView ? (
                  <p className="mt-2 text-sm font-medium text-center">
                    Do you have an account?{" "}
                    <span
                      className="cursor-pointer text-pp-primary-600"
                      onClick={() => {
                        setShowSignUpView(false);
                        setForm((prevForm) => ({
                          ...prevForm,
                          emailErr: "",
                          fNameErr: "",
                          lNameErr: "",
                        }));
                      }}
                    >
                      Login
                    </span>
                  </p>
                ) : (
                  <p className="mt-2 text-sm font-medium text-center">
                    Don't you have an account?{" "}
                    <span
                      className="cursor-pointer text-pp-primary-600"
                      onClick={() => {
                        setShowSignUpView(true);
                        setForm((prevForm) => ({
                          ...prevForm,
                          emailErr: "",
                        }));
                      }}
                    >
                      Sign up free
                    </span>
                  </p>
                )}
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleOTP}>
              <Input
                label="OTP"
                name="otp"
                value={form.otp}
                handleChange={handleChange}
                error={form.otpErr}
                info={`An OTP has been sent to ${form.email}`}
              />
              <div>
                <Button
                  type="submit"
                  variant="dark"
                  className="w-full"
                  isLoading={loading}
                >
                  Verify OTP
                </Button>
                <p
                  className="mt-2 text-sm font-medium text-center cursor-pointer"
                  onClick={handleBack}
                >
                  Go back
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginMain;
