import React, { useState } from "react";
import "./bookingdetail.scss";
import Item from "./../../../../Assets/Images/item.jpg";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookingDetail(props) {
  const [acctiveTab, setActiveTab] = useState("upcoming");
  const handleTab = (e) => {
    setActiveTab(e);
  };
  const location = useLocation();

  const { trackid } = location.state;
  console.log("trackid", trackid);
  const navigate = useNavigate();
  const bookingDetails = () => {
    navigate("/bookingdetails");
  };

  return (
    <section className="booking_detail">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="tabs">
              {/* <button onClick={((e) => handleTab('live'))} className={acctiveTab === 'live' ? 'active' : ''}>Live</button> */}
              <button
                onClick={(e) => handleTab("upcoming")}
                className={acctiveTab === "upcoming" ? "active" : ""}
              >
                Upcomming
              </button>
              <button
                onClick={(e) => handleTab("completed")}
                className={acctiveTab === "completed" ? "active" : ""}
              >
                Completed
              </button>
            </div>
            {acctiveTab === "upcoming" && (
              <div className="tab_view" onClick={bookingDetails}>
                <div className="tab_heading">
                  <div className="left">
                    <div className="book_id">Booking ID : 6548651612</div>
                    <div className="book_date">Booked on 15 feb, 2023</div>
                  </div>
                  <div className="right">
                    <div className="tab_price">Rs. 4574</div>
                  </div>
                </div>
                <div className="services_time">
                  <div className="s_time_title">Service Date & Time</div>
                  <div className="s_time">
                    Fri , 24 Feb, 2023 - <span>9:30 am</span>
                  </div>
                </div>
                <div className="tab_ser_detail">
                  <div className="title">Home Deep Cleaning</div>
                  <div className="tab_ser">
                    <div className="tab_img">
                      <img src={Item} alt="" />
                    </div>
                    <div className="ser_text">
                      <h4>Premium Cleaning</h4>
                      <p>1 Bhk</p>
                    </div>
                  </div>
                  <div className="tab_ser">
                    <div className="tab_img">
                      <img src={Item} alt="" />
                    </div>
                    <div className="ser_text">
                      <h4>Premium Cleaning</h4>
                      <p>1 Bhk</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {acctiveTab === "upcoming" && (
              <div className="tab_view">
                <h1>Upcoming</h1>
              </div>
            )}
            {acctiveTab === "completed" && (
              <div className="tab_view">
                <h1>Completed</h1>
              </div>
            )}
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </section>
  );
}
