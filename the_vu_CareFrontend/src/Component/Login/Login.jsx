import React, { useState } from "react";
import "../Login/login.scss";
import { useForm } from "react-hook-form";
import Google from "./../../Assets/Images/google.svg";
import Apple from "./../../Assets/Images/apple.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
// import Header from "../Header/Header";
import axios from "axios";
import NabarCompo from "../navbar";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleResetModal = () => {
    setOpenResetModal(!openResetModal);
  };

  const [openOTP, setOpenOTP] = useState(false);
  const handleOTPModal = () => {
    setOpenOTP(!openOTP);
    setOpenResetModal(false);
  };
  const handleReset = () => {
    navigate("/resetpassword");
  };

  //   const handleLogin = () => {
  //     localStorage.setItem("Login", true);
  //   };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/usersign",
        method: "post",
        baseURL: "http://localhost:8008/api",
        headers: { "Content-Type": "application/json" },
        data: {
          email: Email,
          password: Password,
        },
      };

      let res = await axios(config);

      if (res.status === 200) {
        alert("Login Succesfully added");
        console.log(res?.data?.user);
        sessionStorage.setItem("userdata", JSON.stringify(res?.data?.user));
        // Serialize the user object to JSON

        window.location.href = "/viewcart";
      }
    } catch (err) {
      alert("Invalid Email or Password");
      console.log(err, "err while adding customer");
    }
  };
  const handleAppleSignIn = async () => {
    try {
      const response = await window.AppleID.auth.signIn({
        requestedScopes: ["email", "name"],
      });

      // Handle the response, which contains user information.
      console.log(response);

      // You can send the response to your server for further processing.
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  return (
    <section className="login">
      <NabarCompo />
      <div className="page_heading">
        <div className="title">Login</div>
      </div>
      <div className="container">
        <div className="login_wrapper">
          <div className="login_header">
            <div className="title">Sign in to your account</div>
          </div>
          <div className="login_body">
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email "
              />
              <input
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <div className="action">
                <div className="remember">
                  <label className="check_container">
                    Remember Me
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div onClick={handleResetModal} className="forget">
                  Forgot Password?
                </div>
              </div>
              <button className="p-2" type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
          {/* <div className="login_footer">
            <p>or continue with</p>
            <div className="action">
              <button className="google">
                <img src={Google} alt="" />
                <span>Google</span>
              </button>
              <button className="apple" onClick={handleAppleSignIn}>
                <img src={Apple} alt="" />
                <span>Apple</span>
              </button>
            </div>
          </div> */}
          <Modal open={openResetModal} onClose={openResetModal}>
            <div className="modal_wrapper">
              <div className="modal_header">
                <div className="title">Forgot Password</div>
                <div className="close_btn" onClick={handleResetModal}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9958 9.34913 20.9408 6.80805 19.0664 4.93361C17.192 3.05916 14.6509 2.00423 12 2ZM15.36 14.3C15.4995 14.4411 15.5777 14.6316 15.5777 14.83C15.5777 15.0284 15.4995 15.2189 15.36 15.36C15.2905 15.4298 15.2079 15.4852 15.117 15.5229C15.026 15.5607 14.9285 15.5802 14.83 15.5802C14.7315 15.5802 14.634 15.5607 14.543 15.5229C14.4521 15.4852 14.3695 15.4298 14.3 15.36L12 13.06L9.7 15.36C9.63051 15.4298 9.54791 15.4852 9.45696 15.5229C9.36601 15.5607 9.26849 15.5802 9.17 15.5802C9.07152 15.5802 8.974 15.5607 8.88305 15.5229C8.7921 15.4852 8.7095 15.4298 8.64 15.36C8.50052 15.2189 8.4223 15.0284 8.4223 14.83C8.4223 14.6316 8.50052 14.4411 8.64 14.3L10.94 12L8.64 9.7C8.50752 9.55783 8.4354 9.36978 8.43883 9.17548C8.44226 8.98118 8.52097 8.79579 8.65838 8.65838C8.7958 8.52097 8.98118 8.44225 9.17548 8.43883C9.36978 8.4354 9.55783 8.50752 9.7 8.64L12 10.94L14.3 8.64C14.4422 8.50752 14.6302 8.4354 14.8245 8.43883C15.0188 8.44225 15.2042 8.52097 15.3416 8.65838C15.479 8.79579 15.5578 8.98118 15.5612 9.17548C15.5646 9.36978 15.4925 9.55783 15.36 9.7L13.06 12L15.36 14.3Z"
                      fill="#292D32"
                    />
                  </svg>
                </div>
              </div>
              <div className="modal_body">
                <div className="title">
                  Enter your mobile number or email to reset your password.
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="Email or Phone Number"
                  />
                  <button type="submit" onClick={handleOTPModal}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </Modal>

          <Modal open={openOTP} onClose={openOTP}>
            <div className="modal_wrapper">
              <div className="modal_header">
                <div className="title">Verification</div>
              </div>
              <div className="modal_body">
                <div className="title">
                  Enter 4 digit verification code sent to your number
                </div>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div className="otp_wrapper">
                    <input
                      type="password"
                      {...register("opt")}
                      maxlength="1"
                      required
                      placeholder="0"
                    />
                    <input
                      type="password"
                      {...register("opt")}
                      maxlength="1"
                      required
                      placeholder="0"
                    />
                    <input
                      type="password"
                      {...register("opt")}
                      maxlength="1"
                      required
                      placeholder="0"
                    />
                    <input
                      type="password"
                      {...register("opt")}
                      maxlength="1"
                      required
                      placeholder="0"
                    />
                  </div>
                  <div className="resend">
                    Resend code in <span>00:59</span>
                  </div>
                  <button type="submit" onClick={handleReset}>
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
}
