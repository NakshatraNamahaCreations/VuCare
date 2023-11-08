import React from 'react'
import './scheduleservice.scss'
import Calendar from './../../../../Assets/Images/calendar.svg'

export default function ScheduleService() {
  return (
    <div className='scheduleservice'>
        <div className="title">Schedule Service</div>
        <div className="select_date">
            <div className="text">Select the date</div>
            <div className="date_selection">
                <label htmlFor="1">
                    <input type="checkbox" name="" id="1" defaultChecked/>
                    <span>Today, 20</span>
                </label>
                <label htmlFor="2">
                    <input type="checkbox" name="" id="2" />
                    <span>Tue, 21</span>
                </label>
                <label htmlFor="3">
                    <input type="checkbox" name="" id="3" />
                    <span>wed, 22</span>
                </label>
                <label htmlFor="4">
                    <input type="checkbox" name="" id="4" />
                    <span>thu, 23</span>
                </label>
                <label htmlFor="5">
                    <input type="checkbox" name="" id="5" />
                    <span>Fri, 24</span>
                </label>
            </div>
            <div className="date">
                <button><img src={Calendar} alt="" /> Pick Date</button>
                <div className="date_picker">
                </div>
            </div>
        </div>
        <div className="select_date">
            <div className="text">Select the Slot</div>
            <div className="date_selection">
                <label htmlFor="1">
                    <input type="checkbox" name="" id="1" defaultChecked/>
                    <span>9:30 am</span>
                </label>
                <label htmlFor="2">
                    <input type="checkbox" name="" id="2" />
                    <span>10:30 am</span>
                </label>
                <label htmlFor="3">
                    <input type="checkbox" name="" id="3" />
                    <span>11:30 am</span>
                </label>
                <label htmlFor="4">
                    <input type="checkbox" name="" id="4" />
                    <span>12:30 pm</span>
                </label>
                <label htmlFor="5">
                    <input type="checkbox" name="" id="5" />
                    <span>1:30 pm</span>
                </label>
                <label htmlFor="6">
                    <input type="checkbox" name="" id="5" />
                    <span>2:30 pm</span>
                </label>
                <label htmlFor="7">
                    <input type="checkbox" name="" id="5" />
                    <span>3:30 pm</span>
                </label>
                <label htmlFor="8">
                    <input type="checkbox" name="" id="5" />
                    <span>4:30 pm</span>
                </label>
                <label htmlFor="8">
                    <input type="checkbox" name="" id="5" />
                    <span>5:30 pm</span>
                </label>
            </div>
        </div>
    </div>
  )
}
