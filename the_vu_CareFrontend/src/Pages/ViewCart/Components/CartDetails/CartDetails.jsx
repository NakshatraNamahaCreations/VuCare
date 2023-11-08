import React, { useEffect, useState } from "react";
import "./cartdetails.scss";
import Add from "./../../../../Assets/Images/add.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../../ServicesView/Components/AddOn/addon.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "../CartDetails/cartdetails.scss";
import "../PersonalInfo/personalinfo.scss";
import "../CartDetails/cartitem.scss";
import "../ScheduleService/scheduleservice.scss";
import "../Payment/payment.scss";
import "../Summary/summary.scss";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartDetails() {
  const location = useLocation();
  const storedUserDataJSON = sessionStorage.getItem("userdata");

  let userData = null;
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  const { passseviceid, bhk, selectecity } = location.state || {};

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [Service, setService] = useState([]);
  const navigate = useNavigate();
  // const [pay, setPay] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [viewOrder, setViewOrder] = useState(false);
  const [viewAddress, setviewAddress] = useState(false);
  const [AddAddress, setAddAddress] = useState(false);
  const [Voucher, setVoucher] = useState([]);
  const [coupancode, setCoupanCode] = useState(null);
  const [Discount, setDiscount] = useState(null);
  const [fourDates, setFourDates] = useState([]);

  const [datepicker, setdatePicker] = useState(false);

  const [addOption, setAddOption] = useState(false);
  const [AddOn, setAddOn] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotsID, setselectedSlotsID] = useState(null);

  const [CustomerAddress, setCustomerAddress] = useState("");
  const [CustomerStreet, setCustomerStreet] = useState("");
  const [CustomerLandMark, setCustomerLandMark] = useState("");
  const [CustomerState, setCustomerState] = useState("");
  const [CustomerCity, setCustomerCity] = useState("");
  const [CustomerZipCode, setCustomerZipCode] = useState("");

  const [NumberOfQunatity, setNumberOfQunatity] = useState(1);

  const [selectedpaymentOption, setselectedpaymentOption] = useState(null);

  const [DelivaryAddress, setDelivaryAddress] = useState(null);
  const [SelectedAddress, setSelectedAddress] = useState(null);
  const [allBookedServices, setallBookedServices] = useState(null);

  useEffect(() => {
    getAllServices();
    getVoucher();
    getAddons();
    getDeliveryAddres();
    getServiceDetails();
  }, []);
  const handleAddAddres = () => {
    setAddAddress(true);
  };

  const handleAddOption = () => {
    setAddOption(!addOption);
  };
  // const gotoBooking = () => {
  //   navigate("/booking");
  // };

  const currentDate1 = new Date(Date.now());

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = currentDate1.toLocaleDateString("en-US", options);

  const result = ` ${formattedDate} `;
  const time = currentDate1.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

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
  const handleAddon = (addon) => {
    setSelectedAddons((prevAddons) =>
      prevAddons.concat(Array.isArray(addon) ? addon : [addon])
    );
  };

  useEffect(() => {
    const filteredService = Service.filter((service) => {
      return service?._id === passseviceid;
    });

    setCartData(filteredService);
  }, [passseviceid, Service]);

  const getVoucher = async () => {
    try {
      let res = await axios.get(`http://localhost:8008/api/userapp/getvoucher`);
      if (res.status === 200) {
        setVoucher(res.data.voucher);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let services = Service?.filter((ele, index) => {
    return ele?._id === passseviceid;
  });

  let k = Voucher.filter((ele) =>
    ele?.category
      ?.toLowerCase()
      ?.includes(services?.map((ele) => ele?.category?.toLowerCase()))
  );

  const getColorForNthChild = (index) => {
    const colors = [
      "rgb(51, 165, 127)",
      "rgb(53, 165, 51)",
      "rgb(166, 106, 21)",
    ];

    return colors[index % colors?.length];
  };

  const handlegetcoupan = (e, clickedId, desc) => {
    e.preventDefault();
    setCoupanCode(clickedId);
    setDiscount(desc);
  };
  let AddOnPrice = 0;
  let CountAddon = 0;
  let addOnPrice = selectedAddons?.map((addon) => {
    CountAddon++;
    return Number(addon?.addOnsOfferPrice);
  });

  let getaddonsSum = addOnPrice?.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue,
    AddOnPrice
  );
  let FreqensaveAmt = 0;
  const calculateSubtotal = (cartData, cartItems) => {
    let subtotal = 0;
    let frequentAmount = 0;
    let totalPrice = 0;
    cartData?.forEach((ele) => {
      ele?.morepriceData
        .filter((item) => item?._id === bhk?.[0])
        ?.forEach((filteredElement) => {
          const price = parseFloat(filteredElement?.pofferprice) || 0;
          const RealPrice = parseFloat(filteredElement?.pPrice) || 0;
          FreqensaveAmt =
            parseInt(RealPrice) * Number(NumberOfQunatity) -
            parseInt(price) * Number(NumberOfQunatity);
          subtotal += parseInt(price) * Number(NumberOfQunatity);
          frequentAmount += FreqensaveAmt;
          totalPrice += RealPrice * Number(NumberOfQunatity);
        });
    });

    return { subtotal, frequentAmount, totalPrice };
  };
  const { subtotal, frequentAmount, totalPrice } = calculateSubtotal(
    cartData,
    passseviceid
  );

  const discountAmount = (Number(subtotal) * Number(Discount)) / 100;
  const grandTotal =
    Number(subtotal) - Number(discountAmount) + Number(getaddonsSum);

  const currentDate = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const getNextDays = () => {
      const nextDays = [];
      for (let i = 0; i < 4; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayName = daysOfWeek[date.getDay()];

        nextDays.push({ day, month, year, dayName });
      }
      return nextDays;
    };

    const nextDays = getNextDays();
    setFourDates(nextDays);
  }, []);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tileDisabled = ({ date }) => {
    const isPastDate = date <= yesterday;
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isPastDate || isNextFourDate;
  };
  const tileClassName = ({ date }) => {
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isNextFourDate ? "selecteddate" : "";
  };

  const DatePicker = (e) => {
    e.preventDefault();
    setdatePicker(true);
  };

  const cityname = selectecity?.toLowerCase();

  const filteredServices = services?.filter((ele) =>
    ele?.store_slots?.some((slot) =>
      slot?.slotCity?.toLowerCase()?.includes(cityname)
    )
  );
  const getAddons = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8008/api/userapp/getServiceAddOns`
      );
      if (res.status === 200) {
        setAddOn(res?.data?.AddOns);
        // .filter((i) => i.addOnsCategory === selectedCategory)
      }
    } catch (err) {
      console.log(err);
    }
  };

  let cate = services?.map((ele) => ele?.serviceName?.toLowerCase());
  const filteredAddons = AddOn?.filter((addon) => {
    const addonCategory = addon?.addOnsCategory?.toLowerCase();
    return addonCategory?.includes(cate);
  });

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("LL"));
  };

  const handleCalendarSelect = (date) => {
    const selectedDate = moment.isMoment(date) ? date.toDate() : date;
    setSelectedDate(selectedDate);
    setdatePicker(false);
  };

  const handleSlotSelect = (starttime, endtime) => {
    setselectedSlotsID([{ startTime: starttime, endTime: endtime }]);
  };

  const monthsMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const isDateSelected = (day) => {
    if (!selectedDate) return false; // If selectedDate is null or undefined, return false

    const { day: dayNumber, month, year } = day;
    const monthName = monthsMap[month];

    if (!monthName) {
      console.error("Invalid month number:", month);
      return false;
    }

    const formattedDay = moment(
      `${monthName} ${dayNumber}, ${year}`,
      "MMMM D, YYYY"
    ).format("LL");

    return formattedDay === selectedDate;
  };

  const serviceidd = services?.flatMap((ele) => ele);

  const selectedSlotTextget = selectedSlotsID
    ?.map((slot) => `${slot?.startTime} - ${slot?.endTime}`)
    ?.join(", ");

  const handleOptionClick = (selectedId) => {
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    if (selectedId === "option1") {
      option1.checked = true;
      option2.checked = false;

      setselectedpaymentOption("Pay Online");
    } else if (selectedId === "option2") {
      option1.checked = false;
      option2.checked = true;

      setselectedpaymentOption("Cash on Delivery");
    }
  };

  // const addenquiry = async () => {
  //   // e.preventDefault();

  //   try {
  //     const formattedDate = moment().format("MM-DD-YYYY");
  //     if (userData === null || userData === undefined) {
  //       alert("Please Login ");
  //     } else {
  //       if (SelectedAddress === null || SelectedAddress === undefined) {
  //         alert("Please Select Address");
  //         setviewAddress(true);
  //       } else {
  //         const config = {
  //           url: "/addenquiry",
  //           method: "post",
  //           baseURL: "http://localhost:8008/api",

  //           headers: { "content-type": "application/json" },
  //           data: {
  //             enquirydate: formattedDate,
  //             name: userData?.customerName,
  //             contact1: userData?.contactPerson,
  //             email: userData?.email,
  //             address: { SelectedAddress },
  //             city: userData?.city,
  //             reference1: "Website",
  //             intrestedfor: serviceidd?.serviceName?.[0],
  //             serviceID: serviceidd?._id?.[0],
  //             time: selectedSlotTextget,
  //           },
  //         };
  //         await axios(config).then(function (response) {
  //           if (response.status === 200) {
  //             AddEnquiryfollowup(response.data.data);
  //             setviewAddress(!viewAddress);
  //             setSelectedAddress(" ");
  //           }
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response) {
  //       alert(error.response.data.error);
  //     } else {
  //       alert("An error occurred. Please try again later.");
  //     }
  //   }
  // };

  // const AddEnquiryfollowup = async (data) => {
  //   let responseData;

  //   try {
  //     // if (serviceid?.serviceDirection?.includes("Survey")) {
  //     //   responseData = "Survey";
  //     // } else {
  //     //   responseData = "New";
  //     // }
  //     const config = {
  //       url: "/addenquiryfollowup",
  //       method: "post",
  //       baseURL: "http://localhost:8008/api",

  //       headers: { "content-type": "application/json" },
  //       data: {
  //         EnquiryId: data?.EnquiryId,
  //         category: data?.category,
  //         response: responseData,
  //         nxtfoll: selectedDate,
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         alert("Service Booked Succesfully  ");
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response) {
  //       alert(error.response.data.error);
  //     } else {
  //       alert("An error occurred. Please try again later.");
  //     }
  //   }
  // };

  const isSurvey = services?.some((ele) =>
    ele?.serviceDirection?.includes("Survey")
  );
  let isEnquiry = services?.some((ele) =>
    ele?.serviceDirection?.includes("Enquiry")
  );

  let ServicePans = cartData?.map((item) =>
    item.morepriceData
      .filter((item) => item?._id === bhk?.[0])
      ?.map((ele) => ele)
  );
  const firstFilteredElement = ServicePans?.[0]?.[0];

  const calculateExpiryDate = (selectedDate, servicePeriod) => {
    let monthsToAdd = 0;

    // Determine the number of months to add based on service period
    if (servicePeriod === "monthly") {
      monthsToAdd = 1;
    } else if (servicePeriod === "quart") {
      monthsToAdd = 3;
    } else if (servicePeriod === "half") {
      monthsToAdd = 6;
    } else if (servicePeriod === "year") {
      monthsToAdd = 12;
    }

    // Calculate the expiryDate by adding the months
    const expiryDate = moment(selectedDate)
      .add(monthsToAdd, "months")
      .format("YYYY-MM-DD");

    return expiryDate;
  };

  const servicePeriod = firstFilteredElement?.servicePeriod;

  const dividedamtCharges = [firstFilteredElement?.pofferprice];
  const pofferprice = firstFilteredElement?.pofferprice;

  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);
  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / dividedamtCharges);

  const dividedDates = [];
  const dividedamtDates = [new Date(selectedDate)];

  const sf = dividedamtCharges ? dividedamtCharges : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate.clone().add(interval * i, "days");
    dividedDates.push(date);
  }

  let addOnsCategory = selectedAddons.map((Ele) => Ele.addOnsCategory);

  const joinedPlanNames = addOnsCategory
    .concat(serviceidd?.[0]?.serviceName)
    .join(",");
  const generateBookingId = (length) => {
    let bookingId = "";
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      bookingId += randomDigit;
    }
    return bookingId;
  };
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/getservicedetails`
      );
      if (response.status === 200) {
        let filtredServices = response.data.servicedetails.filter(
          (itme) => itme.serviceID !== passseviceid
        );
        console.log(filtredServices, "filtredServices");
        setallBookedServices(filtredServices);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeliveryAddress = async (eleId) => {
    const selectedAddress = DelivaryAddress.find((item) => item._id === eleId);
    setSelectedAddress(selectedAddress);

    setviewAddress(false);
    await handleBookservices();
  };

  const handleBookservices = async () => {
    // e.preventDefault();

    try {
      if (userData === null || userData === undefined) {
        alert("Please Login ");
      } else {
        if (SelectedAddress === null || SelectedAddress === undefined) {
          alert("Please Select Address");
          setviewAddress(true);
        } else {
          const generatedBookingId = generateBookingId(8);

          const config = {
            url: `/addservicedetails`,
            baseURL: "http://localhost:8008/api",
            headers: { "content-type": "application/json" },
            method: "post",
            data: {
              customer: userData,
              customerData: userData,
              dividedDates: dividedDates ? dividedDates : selectedDate,
              dividedamtCharges: dividedamtCharges,
              dividedamtDates: dividedamtDates,
              cardNo: userData?.cardNo,
              category: serviceidd?.[0]?.category,
              contractType: !pofferprice ? "One Time" : "AMC",
              service: serviceidd?.[0].serviceName,
              serviceCharge: firstFilteredElement?.pofferprice,
              dateofService: selectedDate,
              selectedSlotText: selectedSlotTextget,
              serviceFrequency: firstFilteredElement?.pservices,
              startDate: selectedDate,
              expiryDate: expiryDate,
              firstserviceDate: selectedDate,
              date: moment().format("YYYY-MM-DD"),
              time: moment().format("LT"),
              type: "Website",
              desc: joinedPlanNames,
              city: selectecity,
              userId: userData?._id,
              deliveryAddress: JSON.stringify(SelectedAddress),
              serviceImg: serviceidd?.serviceImg,
              AddOns: selectedAddons,
              discAmt: discountAmount,
              GrandTotal: grandTotal,
              paymentMode: selectedpaymentOption,
              TotalAmt: grandTotal
                ? parseFloat(firstFilteredElement?.pPrice) +
                  parseFloat(grandTotal)
                : firstFilteredElement?.pPrice,
              couponCode: coupancode,
              totalSaved: discountAmount
                ? frequentAmount + discountAmount
                : frequentAmount,
              bookingId: generatedBookingId,
              serviceID: passseviceid,
              planid: bhk?.[0],
              qunty: Number(CountAddon) + Number(NumberOfQunatity),
              subtotal: subtotal,
            },
          };

          await axios(config).then(function (response) {
            if (response.status === 200) {
              setSelectedAddress(null);
              setViewOrder(true);
            }
          });
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const DeliveryAddres = async (e) => {
    e.preventDefault();

    try {
      let deliveryAddress = {
        address: CustomerAddress,
        streetName: CustomerStreet,
        landmark: CustomerLandMark,
        state: CustomerState,
        city: CustomerCity,
        zipcode: CustomerZipCode,
        userId: userData._id,
      };
      const config = {
        url: `/addcustomerAddress`,
        baseURL: "http://localhost:8008/api",
        headers: { "content-type": "application/json" },
        method: "post",
        data: deliveryAddress,
      };

      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Address Added Succesfully");
          setAddAddress(false);
          setCustomerAddress("");
          setCustomerStreet("");
          setCustomerLandMark("");
          setCustomerState("");
          setCustomerCity("");
          setCustomerZipCode("");
        }
      });
    } catch (error) {
      console.error("error", error);
      alert(error);
    }
  };

  const getDeliveryAddres = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8008/api/getalladress"
      );
      if (response.status === 200) {
        let Address = response?.data?.data
          ?.filter((ele) => ele?.userId === userData?._id)
          .map((ele) => ele);

        setDelivaryAddress(Address);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <a href="/servicedetails" className="ms-4">
        <ArrowCircleLeftIcon />
      </a>
      <div className="cart_heading">
        <div className="container">
          <div className="cart_heading_content">
            <div className="text">
              <h3>View Service Cart</h3>
              <p> items added</p>
            </div>

            {/* <div className="action">
              <button className="button1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.7368 9.26313H1.26316C0.928829 9.26093 0.608821 9.12713 0.372409 8.89072C0.135998 8.65431 0.00220686 8.3343 0 7.99997C0.00220686 7.66565 0.135998 7.34564 0.372409 7.10923C0.608821 6.87281 0.928829 6.73902 1.26316 6.73682H14.7368C15.0712 6.73902 15.3912 6.87281 15.6276 7.10923C15.864 7.34564 15.9978 7.66565 16 7.99997C15.9978 8.3343 15.864 8.65431 15.6276 8.89072C15.3912 9.12713 15.0712 9.26093 14.7368 9.26313Z" />
                  <path d="M6.73684 14.7368L6.73684 1.26313C6.73905 0.928803 6.87284 0.608795 7.10925 0.372383C7.34566 0.135972 7.66567 0.00218104 8 -2.58044e-05C8.33433 0.00218107 8.65434 0.135972 8.89075 0.372383C9.12716 0.608795 9.26095 0.928803 9.26316 1.26313L9.26316 14.7368C9.26095 15.0711 9.12716 15.3912 8.89075 15.6276C8.65434 15.864 8.33433 15.9978 8 16C7.66567 15.9978 7.34566 15.864 7.10925 15.6276C6.87284 15.3912 6.73905 15.0711 6.73684 14.7368Z" />
                </svg>
                Add More Service
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <section className="cart_details">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cartData?.map((ele) => (
                <div className="cart_item_box">
                  <div className="item_title">{ele?.serviceName}</div>
                  <div className="item_content">
                    <div className="left">
                      <div className="left_img">
                        <img
                          src={`http://localhost:8008/service/${ele?.serviceImg}`}
                          alt=""
                        />
                      </div>

                      <div className="texts">
                        <h4>{ele.servicetitle}</h4>
                        {ele.morepriceData
                          .filter((item) => item?._id === bhk?.[0])
                          .map((filteredElement) => (
                            <div key={filteredElement?._id}>
                              {filteredElement?.pName}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-5">
                      {/* <div className="row right"> */}
                      {ele.morepriceData
                        .filter((item) => item?._id === bhk?.[0])

                        .map((filteredElement) => (
                          <div className="row   ">
                            <span className="col-md-6 m-auto wrong_price ">
                              {filteredElement?.pPrice && "Rs."}{" "}
                              {filteredElement?.pPrice}
                            </span>
                            <span className="col-md-6 m-auto real_price">
                              {filteredElement?.pPrice && "Rs."}{" "}
                              {filteredElement?.pofferprice}
                            </span>
                          </div>
                        ))}
                      {/* </div> */}
                    </div>
                    <div className="col-md-2 ">
                      <Form.Control
                        placeholder="No Qty"
                        onChange={(e) => setNumberOfQunatity(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="scheduleservice">
                <div className="title">Schedule Service</div>
                <div className="select_date">
                  <div className="text">Select the date</div>

                  <div className="date_selection">
                    {fourDates?.map((day, index) => {
                      const isDefaultChecked = isDateSelected(day);

                      return (
                        <label htmlFor={index} key={index}>
                          <input
                            type="checkbox"
                            // defaultChecked={isDefaultChecked}
                            name=""
                            id={day?.day}
                          />

                          <span
                            className={`inpt ${
                              isDefaultChecked ? "matching" : ""
                            }`}
                            onClick={() => handleCheckboxSelect(day)}
                          >
                            {day?.dayName}- {day?.day}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="date">
                    <button onClick={DatePicker} style={{ cursor: "pointer" }}>
                      Pick Date
                    </button>
                    <div className="date_picker"></div>
                  </div>
                  {datepicker && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        position: "absolute",
                        top: "29.4%",
                        left: "20%",
                        zIndex: "100",
                      }}
                    >
                      <div>
                        <Calendar
                          onChange={(date) => handleCalendarSelect(date)}
                          value={selectedDate}
                          calendarType="US"
                          tileDisabled={tileDisabled}
                          tileClassName={tileClassName}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="select_date">
                  <div className="text">Select the Slot</div>

                  <div className="date_selection">
                    {filteredServices?.map((ele) =>
                      ele.store_slots?.map((slotItem) => {
                        const isSlotSelected = selectedSlotsID?.some(
                          (ele) =>
                            ele?.endTime === slotItem?.endTime &&
                            ele?.startTime === slotItem?.startTime
                        );

                        return (
                          <label key={slotItem.id} htmlFor={slotItem.id}>
                            <input type="checkbox" />

                            <span
                              className={`p-2 inpt ${
                                isSlotSelected ? "matching" : ""
                              }`}
                              onClick={() =>
                                handleSlotSelect(
                                  slotItem?.startTime,
                                  slotItem?.endTime
                                )
                              }
                            >
                              {slotItem.startTime} - {slotItem.endTime}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <Modal
                className="container"
                open={AddAddress}
                onClose={AddAddress}
              >
                <div className="personal_info">
                  {/* <div className="title">Personal Info</div> */}
                  <div>
                    {/* <div className="basic">
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerName}
                            onChange={(e) => setCutomerName(e.target.value)}
                            placeholder="Customer Name"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerLastName}
                            onChange={(e) => setCutomerLastName(e.target.value)}
                            placeholder="Customer Last Name"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerContact}
                            onChange={(e) => setCustomerContact(e.target.value)}
                            placeholder="Mobile Number*"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="email"
                            value={CustomerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="address">
                      <div className="in_title">Address</div>
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="Address"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerStreet}
                            onChange={(e) => setCustomerStreet(e.target.value)}
                            placeholder="Street/Block/Apartment number"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerLandMark}
                            onChange={(e) =>
                              setCustomerLandMark(e.target.value)
                            }
                            placeholder="Landmark"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerState}
                            onChange={(e) => setCustomerState(e.target.value)}
                            placeholder="State"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={CustomerZipCode}
                            onChange={(e) => setCustomerZipCode(e.target.value)}
                            placeholder="Zipcode"
                          />
                        </div>
                        <div className="col-md-2 m-auto ">
                          <button
                            className="row mb-3 p-2"
                            onClick={(e) => DeliveryAddres(e)}
                          >
                            Save
                          </button>
                        </div>
                        <div className="col-md-2 m-auto">
                          <button
                            className="row mb-3 p-2"
                            onClick={() => setAddAddress(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal open={viewAddress} onClose={viewAddress}>
                <div className="modal_wrapper">
                  <div className="modal_body">
                    <div className="hello">Delivery Address</div>
                    <div className="title center">Choose Address</div>
                    <div className="note">
                      {!DelivaryAddress ? (
                        <button onClick={handleAddAddres}>Add Address</button>
                      ) : (
                        <>
                          <p
                            className="container"
                            onClick={handleAddAddres}
                            style={{ color: "#3876BF" }}
                          >
                            <span className="col-md-1">
                              {" "}
                              <AddCircleIcon />
                            </span>
                            <span className="col-md-7"> Add a new address</span>
                          </p>{" "}
                          {DelivaryAddress.map((ele) => (
                            <div className="row" key={ele._id}>
                              <div className="col-md-2">
                                {ele.address && (
                                  <input
                                    type="radio"
                                    defaultChecked={
                                      SelectedAddress === ele ? true : false
                                    }
                                    name="deliveryAddress"
                                    value={ele}
                                    onChange={() =>
                                      handleDeliveryAddress(ele._id)
                                    }
                                  />
                                )}
                              </div>
                              <div className="col-md-10">
                                <span>{ele.address}</span>
                                <span>
                                  {ele.streetName} {ele.landmark}
                                </span>
                                <span>{ele.city}</span>
                                <span>
                                  {ele.state} - {ele.zipcode}
                                </span>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Modal>

              {/* {isSurvey || isEnquiry ? null : ( */}
              <div className="payment">
                <div className="title">Payment Method</div>
                <div className="payment">
                  <div className="options">
                    <div className="remember">
                      <label
                        className="check_container"
                        checked={selectedpaymentOption === "option1"}
                        onClick={() => handleOptionClick("option1")}
                      >
                        Pay Online
                        <input type="radio" id="option1" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  {/* <div className="options price">
                      <div className="remember">
                        <label
                          className="check_container"
                          onClick={() => handleOptionClick("option2")}
                        >
                          Pay from Wallet
                          <input type="radio" id="option2" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="p_text">Rs 6000</div>
                    </div> */}
                  <div className="options">
                    <div className="remember">
                      <label
                        checked={selectedpaymentOption === "option2"}
                        className="check_container"
                        onClick={() => handleOptionClick("option2")}
                      >
                        Cash on Delivery
                        <input type="radio" id="option2" />
                        <span className="checkmark"></span>
                      </label>
                    </div>{" "}
                  </div>{" "}
                </div>
                {/* <form autoComplete="off">
                    <div className="card_details">
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            onChange={(e) => setcardNumber(e.target.value)}
                            placeholder="Card Number"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            onChange={(e) => setNameOnCard(e.target.value)}
                            placeholder="Name on Card"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            onChange={(e) => setcardexpiryDate(e.target.value)}
                            placeholder="Exp. Date*"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            onChange={(e) => setcvv(e.target.value)}
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </div>
                  </form> */}
                {/* <div className="card_no">
                    <div className="remember">
                      <label className="check_container">
                        <div className="card_no_wrapper">
                          <img src={Card} alt="" />
                          <span className="hidden_no">************</span>
                          <span className="highlight">436</span>
                        </div>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div> */}
              </div>
              {/* )} */}
            </div>

            <div className="col-md-4">
              {/* {filteredAddons.length > 0 && ( */}
              <>
                {/* <div className="addon_title">Add On Services</div> */}
                <div className="addon_text">
                  Add on Services booking is only valid after booking of Deep
                  cleaning services
                </div>
              </>
              {/* )} */}
              {filteredAddons?.map((addon) => (
                <div className="addon mt-3">
                  <div className="addon_box">
                    <div className="addon_image">
                      <img
                        src={`http://localhost:8008/addOns/${addon?.addOnsImage}`}
                        alt=""
                      />

                      {/* <div className="offer">
                        {" "}
                        Up to {addon.addOnsOfferPrice}% OFF
                      </div> */}
                    </div>
                    <div className="addon_details">
                      <div className="left">
                        <div className="title">{addon.addOnsCategory}</div>
                        <div>
                          <span className="fake_prices me-2">
                            Rs.{addon.addOnsPrice}
                          </span>
                          <span className="price">
                            {" "}
                            Rs.{addon.addOnsOfferPrice}
                          </span>
                        </div>
                      </div>
                      <div className="right">
                        <button onClick={() => handleAddon(addon)}>
                          <img src={Add} alt="" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* {k?.map((ele, index) => (
                <div className="col-md-10 slide m-auto" key={index}>
                  <div
                    style={{ textDecoration: "none", color: "black" }}
                    className=" jf_box shadow bg-white rounded"
                  >
                    <p>
                      <span
                        style={{ color: getColorForNthChild(index) }}
                        className="code1"
                      >
                        {ele.discountPercentage}
                      </span>{" "}
                      <span>{ele.desc}</span>
                    </p>

                    <div
                      className="code m-auto p-2"
                      style={{ backgroundColor: getColorForNthChild(index) }}
                    >
                      <p
                        style={{ cursor: "pointer" }}
                        className="m-auto "
                        onClick={(e) =>
                          handlegetcoupan(
                            e,
                            ele.voucherCode,
                            ele.discountPercentage
                          )
                        }
                      >
                        GET COUPON CODE
                      </p>
                    </div>
                  </div>
                </div>
              ))} */}
              {/* <div className="promo mt-5">
                <div className="title">Promo / Coupon Code</div>
                <form autoComplete="off">
                  <input
                    type="text"
                    value={coupancode}
                    placeholder="Enter Promocode*"
                  />
                  <button className="button1" type="submit">
                    Submit Now
                  </button>
                </form>
              </div> */}
              <div className="summary">
                <div className="title">Summary</div>
                <div className="summary_points">
                  <div className="key">Total Service </div>
                  <div className="value">
                    {Number(CountAddon) + Number(NumberOfQunatity)}
                  </div>
                </div>
                <div className="summary_points">
                  <div className="key"> Total Amount</div>
                  <div className="value1">Rs.{totalPrice}</div>
                </div>
                <div className="summary_points">
                  <div className="key">Sub Total</div>
                  <div className="value">Rs. {subtotal}</div>
                </div>
                <div className="summary_points">
                  <div className="key">Saved Amount</div>
                  <div className="value">Rs. {frequentAmount}</div>
                </div>
                <div className="summary_points">
                  <div className="key">AddOn Total</div>
                  <div className="value">Rs. {getaddonsSum}</div>
                </div>
                <div className="summary_points">
                  <div className="key">Desc </div>
                  <div className="value">Rs. {Discount}%</div>
                </div>
                <div className="summary_points">
                  <div className="key">Disc Amount</div>
                  <div className="value">Rs. {discountAmount}</div>
                </div>
                <div className="summary_points total">
                  <div className="key me-1 fs-5">Total Amount</div>
                  <div className="value fs-5">Rs. {grandTotal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pay_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="date">
                  Fri , 24 Feb, 2023 - <span> 9:30 am</span>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  style={{ fontSize: "25px" }}
                  onClick={addenquiry}
                  className="goto_pay p-3 button1"
                >
                  BOOK
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="pay_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="date">
                  {result}- <span className="colr"> {time}</span>
                  {/* Fri , 24 Feb, 2023 - <span> 9:30 am</span> */}
                </div>
              </div>
              <div className="col-md-2">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/booking"
                  state={{ idd: passseviceid, planBHk: bhk?.[0] }}
                >
                  <button className="button1" type="submit">
                    View Booking
                  </button>
                </Link>
              </div>
              <div className="col-md-4">
                <button
                  style={{ fontSize: "25px" }}
                  onClick={handleBookservices}
                  className="goto_pay p-3 button1"
                >
                  <span className="me-4 ">
                    {" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(grandTotal)}
                  </span>{" "}
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal open={viewOrder} onClose={viewOrder}>
          <div className="modal_wrapper">
            <div className="modal_body">
              <div className="hello">Booking Successful!</div>
              <div className="title center">
                You have successfully made your booking.
              </div>
              <div className="note">
                You will receive an email containing all your booking details.
              </div>
              <Link
                style={{ textDecoration: "none" }}
                to="/booking"
                state={{ idd: passseviceid, planBHk: bhk?.[0] }}
              >
                <button className="button1" type="submit">
                  View Order
                </button>
              </Link>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}
