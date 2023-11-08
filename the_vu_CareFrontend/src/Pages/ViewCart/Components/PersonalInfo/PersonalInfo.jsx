import React from 'react'
import './personalinfo.scss'
import { useForm } from "react-hook-form";

export default function PersonalInfo() {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);

    return (
        <div className='personal_info'>
            <div className="title">Personal Info</div>
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
                <div className="basic">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" {...register("fname")} placeholder="First Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("lname")} placeholder="Last Name" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("mobilenumber")} placeholder="Mobile Number*" />
                        </div>
                        <div className="col-md-6">
                            <input type="email" {...register("email")} placeholder="Email" />
                        </div>
                    </div>
                </div>
                <div className="address">
                    <div className="in_title">Address</div>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="text" {...register("address")} placeholder="Address" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("Apartmentnumber")} placeholder="Street/Block/Apartment number" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("Landmark")} placeholder="Landmark" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("State")} placeholder="State" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("city")} placeholder="City" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("zipcode")} placeholder="Zipcode" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
