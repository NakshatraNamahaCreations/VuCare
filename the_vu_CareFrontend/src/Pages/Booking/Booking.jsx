import Header from "../../Component/Header";
import BookingHeading from "./Components/BookingHeading/BookingHeading";
import React, { useState, useEffect } from "react";
import "../Booking/Components/BookingDetail/bookingdetail.scss";
// import Item from "./../../../../Assets/Images/item.jpg";
import { Link, useNavigate } from "react-router-dom";
import NabarCompo from "../../Component/navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import "../../index.css";

export default function Booking() {
  let location = useLocation();
  const [acctiveTab, setActiveTab] = useState("upcoming");
  const [BookingDetails, setBookingDetails] = useState([]);
  const { idd, planBHk } = location.state || {};
  const [Service, setService] = useState([]);
  const [Serivid, setSerivid] = useState([]);
  const handleTab = (e) => {
    setActiveTab(e);
  };
  const navigate = useNavigate();
  // const bookingDetails = () => {
  //   navigate("/bookingdetails");
  // };
  useEffect(() => {
    getServiceDetails();
    getAllServices();
  }, []);
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/getservicedetails`
      );
      if (response.status === 200) {
        let filtredServices = response.data.servicedetails.filter(
          (itme) => itme.serviceID === idd
        );

        setBookingDetails(filtredServices);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getservices"
      );
      if (res.status === 200) {
        let data = res?.data?.service;
        let filteredData = data?.flatMap((ele) => {
          if (ele?._id === idd) {
            setSerivid(ele);
            return ele?.morepriceData?.find((item) =>
              item?._id?.includes(planBHk?.[0])
            );
          }
          return [];
        });
        setService(filteredData);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  let FiltredData = BookingDetails.flatMap((ele) => ele);
  let pricename = null;
  let vidios = [
    {
      category: "Cleaning Services",
      img: "../images/clnvd.mp4",
    },

    {
      category: "Painting Services",
      img: "../images/painting.mp4",
    },
    {
      category: "Pest control",
      img: "../images/pest.mp4",
    },
    {
      category: "Garden Maintenance",
      img: "../images/garden.mp4",
    },
  ];
  return (
    <>
      <NabarCompo className="full_screen" />
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
              {FiltredData.map((book) => {
                let bhk = book.planid;

                Service.map((ele) => {
                  if (ele?._id === bhk) {
                    pricename = ele.pName;
                  }
                });

                return (
                  <>
                    {acctiveTab === "upcoming" && (
                      <div className="tab_view">
                        <Link
                          key={book?._id}
                          className="linkkt"
                          state={{ trackid: book?._id }}
                          to="/bookingdetails"
                        >
                          <div className="tab_heading">
                            <div className="left">
                              <div className="book_id">
                                {/* {} */}
                                Booking ID : {book?.bookingId}
                              </div>

                              <div className="book_date">
                                Booked on
                                <span className="ms-2">
                                  {moment(book?.updatedAt).format(
                                    "dddd, MMMM D, YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="right">
                              <div className="tab_price">
                                Rs. {book?.GrandTotal}
                              </div>
                            </div>
                          </div>
                          <div className="services_time">
                            <div className="s_time_title">
                              Service Date & Time
                            </div>
                            <div className="s_time">
                              {moment(book?.startDate).format(
                                "dddd,MMMM D,YYYY"
                              )}{" "}
                              -{" "}
                              <span>
                                {moment(book?.time, "h:mm A").format("h:mm A")}
                              </span>
                            </div>
                          </div>
                          <div className="tab_ser_detail">
                            <div className="title">{book.category}</div>
                            <div className="tab_ser">
                              <div className="tab_img">
                                <img
                                  src={`http://localhost:8008/service/${Serivid?.serviceImg}`}
                                  alt=""
                                />
                              </div>
                              <div className="ser_text">
                                <h4>{book.service}</h4>
                                <p>{pricename}</p>
                              </div>
                            </div>

                            {book?.AddOns?.map((item) => (
                              <>
                                <div className="title">
                                  {item.addOnsCategory}
                                </div>
                                <div className="row tab_ser_detail">
                                  <div className="col-md-3 tab_img">
                                    <img
                                      width={60}
                                      height={60}
                                      style={{ borderRadius: "5px" }}
                                      src={`http://localhost:8008/addOns/${item?.addOnsImage}`}
                                      alt=""
                                    />{" "}
                                  </div>
                                  <div className="col-md-4 ser_text">
                                    <p>{item.addOnsName}</p>{" "}
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </Link>
                      </div>
                    )}

                    {acctiveTab === "completed" && (
                      <div className="tab_view">
                        {console.log(FiltredData)}
                        {FiltredData.filter((ele) => {
                          const currentDate = new Date();
                          const expiryDate = new Date(ele.expiryDate);

                          const selectedSlotDate = new Date(
                            `${currentDate.toDateString()} ${
                              ele.selectedSlotText
                            }`
                          );

                          return (
                            currentDate.getTime() === expiryDate.getTime() &&
                            currentDate.getTime() === selectedSlotDate.getTime()
                          );
                        }).map((ele) => (
                          <>
                            <div className="tab_ser_detail">
                              <div className="title">{ele.category}</div>
                              <div className="tab_ser">
                                <div className="tab_img">
                                  <img
                                    src={`http://localhost:8008/service/${Serivid?.serviceImg}`}
                                    alt=""
                                  />
                                </div>
                                <div className="ser_text">
                                  <h4>{ele.service}</h4>
                                </div>
                              </div>

                              {ele?.AddOns?.map((item) => (
                                <>
                                  <div className="title">
                                    {item.addOnsCategory}
                                  </div>
                                  <div className="row tab_ser_detail">
                                    <div className="col-md-3 tab_img">
                                      <img
                                        width={60}
                                        height={60}
                                        style={{ borderRadius: "5px" }}
                                        src={`http://localhost:8008/addOns/${item?.addOnsImage}`}
                                        alt=""
                                      />{" "}
                                    </div>
                                    <div className="col-md-4 ser_text">
                                      <p>{item.addOnsName}</p>{" "}
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        ))}
                      </div>
                    )}
                  </>
                );
              })}
            </div>

            <div className="col-md-6" >
              {vidios
                .filter((video) => {
                  const catego = video.category?.toLowerCase();
                  return FiltredData.some(
                    (ele) => catego === ele.category?.toLowerCase()
                  );
                })
                .map((filteredVideo) => (
                  <div key={filteredVideo.id} className="row">
                    <video autoPlay loop width={1800} height={400}>
                      <source src={filteredVideo?.img} type="video/mp4" />
                    </video>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
