import React, { useState } from 'react'
import './payment.scss'
import Add from './../../../../Assets/Images/add.svg'
import Added from './../../../../Assets/Images/added.svg'
import Card from './../../../../Assets/Images/mastercard.svg'
import { useForm } from "react-hook-form";

export default function Payment() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);
    const [addOption, setAddOption] = useState(false);
    const handleAddOption = () => {
        setAddOption(!addOption);
    }
    return (
        <div className='payment'>
            <div className="title">Payment Method</div>
            <div className="options">
                <div className="remember"><label className="check_container">BNPL
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label></div>
            </div>
            <div className="options price">
                <div className="remember"><label className="check_container">Pay from Wallet
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label></div>
                <div className="p_text">Rs 6000</div>
            </div>
            <div className="options">
                <div className="remember"><label className="check_container">Credit/ Debit Card
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                </label></div>
                <div className="add">
                    <button onClick={handleAddOption}>
                        {
                            addOption ?
                            <>
                            <img src={Added} alt="" />Added
                            </>
                            :
                            <>
                            <img src={Add} alt="" />Add
                            </>
                        }
                        </button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
                <div className="card_details">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" {...register("cardnumber")} placeholder="Card Number" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("nameoncard")} placeholder="Name on Card" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("expdate")} placeholder="Exp. Date*" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" {...register("cvv")} placeholder="CVV" />
                        </div>
                    </div>
                </div>
            </form>
            <div className="card_no">
                <div className="remember"><label className="check_container">
                    <div className="card_no_wrapper">
                        <img src={Card} alt="" /><span className='hidden_no'>************</span><span className='highlight'>436</span>
                    </div>
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label></div>
            </div>
        </div>
    )
}
