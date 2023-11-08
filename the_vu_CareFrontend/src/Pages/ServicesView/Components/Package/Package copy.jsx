import React, { useEffect, useState } from "react";
import "./package.scss";
import time from "./../../../../Assets/Images/time.svg";
import man from "./../../../../Assets/Images/man.svg";
import Down from "./../../../../Assets/Images/down.svg";
import PackageImg from "./../../../../Assets/Images/package.jpg";
import Premium from "./../../../../Assets/Images/premium.svg";
import Essential from "./../../../../Assets/Images/essential.svg";
import Add from "./../../../../Assets/Images/add.svg";
import Added from "./../../../../Assets/Images/added.svg";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Minus from "./../../../../Assets/Images/minus.svg";
import Plus from "./../../../../Assets/Images/plus.svg";
import Benefit from "./../../../../Assets/Images/benefit.svg";
import axios from "axios";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function Package() {
  const location = useLocation();

  const selectedCategory = new URLSearchParams(location?.search)?.get("id");
  const [categoryData, setCategoryData] = useState([]);
  const [subsubcategory, setsubsubcategory] = useState([]);
  const [Service, setService] = useState([]);
  const [details, setDetails] = useState(false);
  const [BHKId, setBHKId] = useState(null);
  useEffect(() => {
    getAllCategory();
    getAllSubsubCategory();
    getAllServices();
  }, []);

  const [addService, setAddService] = useState(false);
  const handleAdd = () => {
    setAddService(!addService);
  };

  const [viewMore, setViewMore] = useState(false);
  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  const [expanded, setExpanded] = useState("panel1");
  const [expandedd, setExpandedd] = useState("pane2");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChange1 = (panel) => (event, newExpanded) => {
    setExpandedd(newExpanded ? panel : false);
  };
  const [activeDo, setActiveDo] = useState(false);
  const handleDos = () => {
    setActiveDo(!activeDo);
  };

  const getAllSubsubCategory = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getappresubcat"
      );
      if (res.status === 200) {
        setsubsubcategory(res.data.subcategory);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const getAllCategory = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getappsubcat"
      );
      if (res.status === 200) {
        setCategoryData(res.data.subcategory);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getservices"
      );
      if (res.status === 200) {
        setService(res.data.service);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  let services = Service?.filter((ele, index) => {
    return ele?.Subcategory === selectedCategory;
  });
  console.log(Service, "Service");
  // const handleDetails = (id) => {
  //   let idd = services.filter((ele) => ele._id === id);

  //   if (idd) {
  //     setDetails(true);
  //   }
  // };
  const [activeId, setActiveId] = useState(null);

  const handleDetails = (index) => {
    setActiveId((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePrice = (id) => {
    setBHKId(id);
  };

  return (
    <>
      {services.map((ele, index) => (
        <>
          <div className="packages_box">
            <div className="top">
              <div className="image">
                <img
                  width={160}
                  height={130}
                  src={`http://localhost:8008/service/${ele?.serviceImg}`}
                  alt=""
                />
                <div className="offer">
                  <div className="upto">Up to 50% OFF</div>
                  <div className="left">Hurry Up! 2 days left</div>
                </div>
              </div>
              <div className="heading">
                <div className="name">{ele.serviceName}</div>
                <img src={Down} alt="" onClick={() => handleDetails(index)} />
              </div>
              <div className="rating">
                <div className="left">
                  <div className="stars">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                    </svg>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                    </svg>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                    </svg>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                    </svg>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                    </svg>
                  </div>
                  <div className="rating_count">4.0</div>
                  <div className="counts">7K+ Reviews </div>
                </div>
                <div className="right">
                  <div className="time">
                    <img src={time} alt="" /> <span>{ele.serviceHour}</span>
                  </div>
                  <div className="workers">
                    <img src={man} alt="" /> <span>{ele.NofServiceman}</span>
                  </div>
                </div>
              </div>
            </div>
            {activeId === index && (
              <div className="">
                <div className="package_details">
                  <div className="heading">
                    <div className="left">
                      <div className="icon">
                        <img src={Premium} alt="" />
                      </div>
                      <div className="title">{ele.servicetitle}</div>
                    </div>

                    <div className="right">
                      {ele.morepriceData
                        .filter((item) => item._id === BHKId)
                        .map((item) => (
                          <div key={item._id} className="price me-2">
                            Rs.{item.pPrice}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="points">
                    {ele?.serviceDesc?.map((ele) => (
                      <p>{ele.text}</p>
                    ))}
                  </div>
                  <div className="area">
                    {ele.morepriceData.map((item) => (
                      <label htmlFor={item._id}>
                        <input
                          type="radio"
                          name="bhk"
                          id={item._id}
                          defaultChecked={true}
                        />

                        <span onClick={() => handlePrice(item._id)}>
                          {item.pName}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="action">
                    <div className="more" onClick={handleViewMore}>
                      {" "}
                      Show more <img src={Down} alt="" />
                    </div>
                    <div className="add">
                      <div className="off">50% OFF</div>
                      <div className="action_btn">
                        <button onClick={handleAdd}>
                          {addService ? (
                            <>
                              <img src={Added} alt="" /> Added
                            </>
                          ) : (
                            <>
                              <img src={Add} alt="" /> Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="package_details">
                <div className="heading">
                  <div className="left">
                    <div className="icon">
                      <img src={Essential} alt="" />
                    </div>
                    <div className="title">Essential Cleaning</div>
                  </div>
                  <div className="right">
                    <div className="fake_price">Rs.9699</div>
                    <div className="price">Rs.4469</div>
                  </div>
                </div>
                <div className="points">
                  <p>Bathroom and Kitchen deep cleaning</p>
                  <p>Wiping and mopping of complete floor area</p>
                  <p>Cobweb removal and wall dry dusting</p>
                  <p>Dry vacuumming of sofa,carpet and chair</p>
                </div>
                <div className="area">
                  <label htmlFor="5">
                    <input
                      type="radio"
                      name="bhk1"
                      id="5"
                      defaultChecked={true}
                    />
                    <span>1Bhk</span>
                  </label>
                  <label htmlFor="6">
                    <input type="radio" name="bhk1" id="6" />
                    <span>2Bhk</span>
                  </label>
                  <label htmlFor="7">
                    <input type="radio" name="bhk1" id="7" />
                    <span>3Bhk</span>
                  </label>
                  <label htmlFor="8">
                    <input type="radio" name="bhk1" id="8" />
                    <span>4Bhk or above</span>
                  </label>
                </div>
                <div className="action">
                  <div className="more" onClick={handleViewMore}>
                    {" "}
                    Show more <img src={Down} alt="" />
                  </div>
                  <div className="add">
                    <div className="off">50% OFF</div>
                    <div className="action_btn">
                      <button onClick={handleAdd}>
                        {addService ? (
                          <>
                            <img src={Added} alt="" /> Added
                          </>
                        ) : (
                          <>
                            <img src={Add} alt="" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            )}

            <Modal open={viewMore} onClose={viewMore}>
              <div className="modal_wrapper add">
                <div className="packages_box add">
                  <div className="top">
                    <div className="image">
                      <img
                        width={160}
                        height={130}
                        src={`http://localhost:8008/service/${ele?.serviceImg}`}
                        alt=""
                      />
                    </div>
                    <div
                      className={`heading ${details ? "active" : ""}`}
                      onClick={handleDetails}
                    >
                      <div className="name">{ele.serviceName}</div>
                    </div>
                    <div className="rating">
                      <div className="left">
                        <div className="stars">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                          </svg>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                          </svg>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                          </svg>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                          </svg>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.3945 10.8423C14.2979 10.936 14.2255 11.0518 14.1834 11.1797C14.1413 11.3077 14.1309 11.4439 14.153 11.5767L14.8261 15.3018C14.8539 15.4564 14.8365 15.6158 14.7761 15.7608C14.7156 15.9058 14.6147 16.0304 14.4854 16.1195C14.3585 16.2122 14.208 16.267 14.0512 16.2777C13.8945 16.2884 13.7379 16.2546 13.5995 16.1801L10.2461 14.4311C10.1293 14.3693 9.99973 14.3353 9.86758 14.3319H9.66239C9.59077 14.3424 9.52156 14.3655 9.45796 14.4001L6.10382 16.1574C5.93783 16.2409 5.74974 16.2701 5.56625 16.2407C5.35067 16.1997 5.15961 16.0762 5.03374 15.8965C4.90788 15.7167 4.85716 15.4949 4.89239 15.2784L5.56625 11.5532C5.58828 11.4193 5.57784 11.2821 5.53581 11.1532C5.49378 11.0242 5.42139 10.9072 5.32472 10.812L2.59068 8.16196C2.47875 8.05358 2.40011 7.91547 2.36403 7.76389C2.32794 7.61232 2.33592 7.45359 2.38701 7.30639C2.43667 7.15931 2.52566 7.02864 2.64431 6.92853C2.76297 6.82843 2.90676 6.76272 3.06011 6.73854L6.82311 6.19264C6.96412 6.17815 7.09919 6.12829 7.2158 6.04768C7.3324 5.96708 7.42677 5.85833 7.49015 5.73154L9.14754 2.33197C9.18661 2.25607 9.23775 2.18703 9.29896 2.12754L9.36711 2.07454C9.40241 2.03562 9.44353 2.00242 9.48901 1.97611L9.57154 1.94582L9.70025 1.89282H10.019C10.1591 1.90722 10.2933 1.95629 10.4097 2.03561C10.526 2.11493 10.6207 2.22199 10.6853 2.34711L12.3654 5.73154C12.4252 5.85339 12.5135 5.95897 12.623 6.03927C12.7324 6.11956 12.8596 6.17218 12.9938 6.19264L16.7568 6.73854C16.9127 6.7609 17.0594 6.82571 17.1809 6.92586C17.3025 7.02602 17.3941 7.15766 17.4458 7.30639C17.4944 7.45512 17.4996 7.61462 17.4607 7.76617C17.4218 7.91772 17.3405 8.05502 17.2263 8.16196L14.3945 10.8423Z" />
                          </svg>
                        </div>
                        <div className="rating_count">4.0</div>
                        <div className="counts">7K+ Reviews </div>
                      </div>
                      <div className="right">
                        <div className="time">
                          <img src={time} alt="" />{" "}
                          <span>{ele.serviceHour}</span>
                        </div>
                        <div className="workers">
                          <img src={man} alt="" />{" "}
                          <span>{ele.NofServiceman}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="package_details_wrapper">
                    <div className="package_details">
                      <div className="heading">
                        <div className="left">
                          <div className="icon">
                            <img src={Premium} alt="" />
                          </div>
                          <div className="title">{ele.servicetitle}</div>
                        </div>
                      </div>
                      <div className="points">
                        {ele?.serviceDesc?.map((ele) => (
                          <p>{ele.text}</p>
                        ))}
                      </div>
                      <div className="area">
                        {ele.morepriceData.map((item) => (
                          <label htmlFor={item._id}>
                            <input
                              type="radio"
                              name="bhk"
                              id={item._id}
                              defaultChecked={true}
                            />

                            <span onClick={() => handlePrice(item._id)}>
                              {item.pName}
                            </span>
                          </label>
                        ))}
                      </div>
                      <div className="do_s">
                        <div className="title" onClick={handleDos}>
                          {" "}
                          <div className="text">Do’s</div>{" "}
                          <img
                            className={`${activeDo ? "active" : ""}`}
                            src={Down}
                            alt=""
                          />
                        </div>
                        <div
                          className={`dos_points ${activeDo ? "active" : ""}`}
                        >
                          <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleChange("panel1")}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <div className="points_title">
                                <div className="text">ServiceIncludes</div>
                                {expanded === "panel1" ? (
                                  <img src={Minus} alt="" />
                                ) : (
                                  <img src={Plus} alt="" />
                                )}
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="dos_title">
                                {ele.serviceIncludes.map((ele) => (
                                  <>
                                    <p>
                                      {" "}
                                      <img src={Benefit} alt="" />
                                      {ele.text}
                                    </p>
                                  </>
                                ))}
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>

                        <div
                          className={`dos_points ${activeDo ? "active" : ""}`}
                        >
                          <Accordion
                            expanded={expandedd === "pane2"}
                            onChange={handleChange1("pane2")}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <div className="points_title">
                                <div className="text">ServiceExcludes</div>
                                {expandedd === "pane2" ? (
                                  <img src={Minus} alt="" />
                                ) : (
                                  <img src={Plus} alt="" />
                                )}
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="dos_title">
                                {ele.serviceExcludes.map((ele) => (
                                  <>
                                    <p>
                                      {" "}
                                      <img src={Benefit} alt="" />
                                      {ele.text}
                                    </p>
                                  </>
                                ))}
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                      <div className="action">
                        <div className="right">
                          {ele.morepriceData
                            .filter((item) => item._id === BHKId)
                            .map((item) => (
                              <div key={item._id} className="price me-2">
                                Rs.{item.pPrice}
                              </div>
                            ))}
                        </div>
                        <div className="add">
                          <div className="off">50% OFF</div>
                          <div className="action_btn">
                            <button onClick={handleAdd}>
                              {addService ? (
                                <>
                                  <img src={Added} alt="" /> Added
                                </>
                              ) : (
                                <>
                                  <img src={Add} alt="" /> Add
                                </>
                              )}
                            </button>
                            <button className="close" onClick={handleViewMore}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </>
      ))}
    </>
  );
}
