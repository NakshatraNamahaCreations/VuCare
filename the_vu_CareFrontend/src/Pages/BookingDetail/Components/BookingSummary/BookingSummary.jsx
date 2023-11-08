import React from 'react'
import './bookingsummary.scss'

export default function BookingSummary() {
  return (
    <div className='booking_summary'>
        <div className="title">Summary</div>
        <div className="summary_points">
            <div className='key'>Total Service</div>
            <div className='value'>2</div>
        </div>
        <div className="summary_points">
            <div className='key'>Sub total</div>
            <div className='value'>Rs. 4524</div>
        </div>
        <div className="summary_points">
            <div className='key'>Tax </div>
            <div className='value'>Rs. 50</div>
        </div>
        <div className="summary_points red">
            <div className='key'>Promo Discount </div>
            <div className='value'>-Rs. 100</div>
        </div>
        <div className="summary_points total">
            <div className='key'>Total Amount</div>
            <div className='value'>Rs. 4574</div>
        </div>
        <div className="summary_points otp">
            <div className="otp_text">Your OTP <span>3579</span> </div>
        </div>
    </div>
  )
}