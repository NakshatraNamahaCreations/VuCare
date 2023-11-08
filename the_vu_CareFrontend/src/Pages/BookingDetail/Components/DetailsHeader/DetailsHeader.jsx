import React from 'react'
import './detailsheader.scss'
import { NavLink } from 'react-router-dom'
import RightArrow from './../../../../Assets/Images/rightarrow.svg'

export default function DetailsHeader() {
    return (
        <div className='details_header'>
            <div className="container">
                <div className="detail_links">
                    <NavLink to='/' className='active'>Home</NavLink><img src={RightArrow} alt="" />
                    <NavLink to='myaccount'>My Account</NavLink><img src={RightArrow} alt="" />
                    <NavLink to='mybooking'>My Bookings</NavLink>
                </div>
                <div className="booking_id_title">Booking ID : 6548651612</div>
                <div className="booking_id_text">Booked on 15 feb, 2023</div>
            </div>
        </div>
    )
}
