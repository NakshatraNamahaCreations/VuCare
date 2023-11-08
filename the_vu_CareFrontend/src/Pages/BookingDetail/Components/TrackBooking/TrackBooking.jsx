import React from 'react'
import './trackbooking.scss'
import Icon from './../../../../Assets/Images/rightarrow.svg'

export default function TrackBooking() {
    return (
        <div className='tracking'>
            <div class="detail_traking">
                <div class="steps success">
                    <div class="date">Booking Confirmed</div>
                    <div class="text">on 15 Feb, 2023</div>
                </div>
                <div class="steps success">
                    <div class="date">Provider Assigned</div>
                    <div class="text">on 16 Feb, 2023</div>
                </div>
                <div class="steps proccessing">
                    <div class="date">Service in Progress</div>
                </div>
                <div class="steps pending">
                    <div class="date">Service Completed</div>
                </div>
            </div>
        </div>
    )
}
