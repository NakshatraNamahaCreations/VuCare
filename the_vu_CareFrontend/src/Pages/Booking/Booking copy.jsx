import Header from "../../Components/Header/Header";
import BookingHeading from "./Components/BookingHeading/BookingHeading";
import React, { useEffect, useState } from "react";
import "../Booking/Components/BookingDetail/bookingdetail.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Booking() {
  const [acctiveTab, setActiveTab] = useState("upcoming");
  const handleTab = (e) => {
    setActiveTab(e);
  };
  const navigate = useNavigate();
  const bookingDetails = () => {
    navigate("/bookingdetails");
  };
  useEffect(() => {
    getServiceDetails();
  }, []);
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/getservicedetails`
      );
      if (response.status === 200) {
        console.log(response.data.servicedetails);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header className="full_screen" />
      <BookingHeading />
      <section className="booking_detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tabs">
                {/* <button
                  onClick={(e) => handleTab("live")}
                  className={acctiveTab === "live" ? "active" : ""}
                >
                  Live
                </button> */}
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
                        {/* <img src={Item} alt="" /> */}
                      </div>
                      <div className="ser_text">
                        <h4>Premium Cleaning</h4>
                        <p>1 Bhk</p>
                      </div>
                    </div>
                    <div className="tab_ser">
                      <div className="tab_img">
                        {/* <img src={Item} alt="" /> */}
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
    </>
  );
}
