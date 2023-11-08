import React from "react";
import "../../../ViewCart/Components/CartDetails/cartitem.scss";
import "../TrackBooking/trackbooking.scss";
import "../Address/address.scss";
import "../ServiceTime/servicetime.scss";
import "../BookingSummary/bookingsummary.scss";
import ItemImg from "./../../../../Assets/Images/item.jpg";
import Delete from "./../../../../Assets/Images/delete.svg";
export default function BookingDetailsWrapper() {
  return (
    <section className="details_wrapper">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 ">
            <div className="cart_item_box">
              <div className="item_title">Home Deep Cleaning</div>
              <div className="item_content">
                <div className="left">
                  <div className="left_img">
                    <img src={ItemImg} alt="" />
                  </div>
                  <div className="texts">
                    <h4>Premium Cleaning</h4>
                    <p>1 Bhk</p>
                  </div>
                </div>
                <div className="right">
                  <div className="wrong_price">Rs.8499</div>
                  <div className="real_price">Rs.3779</div>
                  <div className="delete">
                    <img src={Delete} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tracking">
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
            <div className="address">
              <div className="title">Address</div>
              <div className="address_text">
                Flat No. 70, Near Vijaya Hospital, Tilakavati Colony, 74,
                Sadhana, North Delhi, Delhi, Pincode-148278
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service_time">
              <div className="title">Service Date & Time</div>
              <div className="serve_date">
                Fri , 24 Feb, 2023 - <span>9:30 am</span>
              </div>
            </div>
            <div className="booking_summary">
              <div className="title">Summary</div>
              <div className="summary_points">
                <div className="key">Total Service</div>
                <div className="value">2</div>
              </div>
              <div className="summary_points">
                <div className="key">Sub total</div>
                <div className="value">Rs. 4524</div>
              </div>
              <div className="summary_points">
                <div className="key">Tax </div>
                <div className="value">Rs. 50</div>
              </div>
              <div className="summary_points red">
                <div className="key">Promo Discount </div>
                <div className="value">-Rs. 100</div>
              </div>
              <div className="summary_points total">
                <div className="key">Total Amount</div>
                <div className="value">Rs. 4574</div>
              </div>
              <div className="summary_points otp">
                <div className="otp_text">
                  Your OTP <span>3579</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
