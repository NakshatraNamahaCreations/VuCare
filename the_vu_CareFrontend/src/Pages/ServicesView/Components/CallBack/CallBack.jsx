import React from 'react'
import './callback.scss'
import { useForm } from "react-hook-form";

export default function CallBack() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);

    return (
        <div className='callback'>
            <div className="title">Fill the Form to Request FREE Call Back</div>
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
                <input type="text" {...register("name")} placeholder="Full Name*" />
                <input type="text" {...register("mobileNumber")} placeholder="Mobile Number*" />
                <input type="text" {...register("address")} placeholder="Address" />
                <button type="submit">Submit Now</button>
            </form>
        </div>
    )
}
