import React from "react";
import "../ResetPassword/resetpassword.scss";
import { useForm } from "react-hook-form";
// import Header from "../Header/Header";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <section className="reset_password">
      {/* <Header/> */}
      <div className="page_heading">
        <div className="title">Reset Password</div>
      </div>
      <div className="container">
        <div className="reset_wrapper">
          <div className="login_header">
            <div className="title">
              Your new password must be different from previous one
            </div>
          </div>
          <div className="login_body">
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
              <input
                type="password"
                {...register("password")}
                placeholder="New Password"
              />
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
