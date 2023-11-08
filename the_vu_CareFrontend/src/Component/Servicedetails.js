import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Header from "./Header";
import NabarCompo from "./navbar";
import Modal from "@mui/material/Modal";
// import CartDetails from "../Pages/ViewCart/Components/CartDetails"
// import  "../Pages/ViewCart/Components/cartdetails.scss"
// import ViewCart from "../Pages/ViewCart/ViewCart";
import "../Component/Servicedetails.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
function Servicedetails() {
  const location = useLocation();
  const { subcategory, SelecteddCity } = location.state || {};
  const [serviceData, setserviceData] = useState([]);
  const [subModel, setsubModel] = useState(false);
  const [filtersub, setfiltersub] = useState([]);
  const [pricesdata, setpricesdata] = useState([]);
  const [Item, setItem] = useState([]);
  const [City, setCity] = useState(null);
  const [SelectedCity, setSelectedCity] = useState(SelecteddCity);

  useEffect(() => {
    getAllServices();
    // getsubcategory();
    getCity();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getservices"
      );
      if (res.status === 200) {
        setserviceData(res.data.service);
        let subcategory = Item?.category?.toLowerCase();

        setfiltersub(
          res?.data?.subcategory?.filter((ele) => {
            let category = ele?.category?.toLowerCase();
            return category.includes(subcategory);
          })
        );
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const handlebookclick = (clickedItem) => {
    // console.log(clickedItem,"item")
    // setpricesdata(clickedItem?.morepriceData);
    setItem(clickedItem);

    setsubModel(true);
    // window.location.assign("/");
    console.log(clickedItem, "clickedItem");
  };
  const [Price, setPrices] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const handleHrSelect = (hr) => {
    const filteredData = serviceData.flatMap((ele) =>
      ele.morepriceData.filter((item) => item?._id === hr)
    );

    setPrices(filteredData);
    console.log(filteredData);
    let dataid = filteredData.map((ele) => ele._id);

    setPriceId(dataid);
  };

  const getCity = async () => {
    try {
      let res = await axios.get("http://localhost:8008/api/master/getcity");
      if (res.status === 200) {
        setCity(res.data.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  // const [s, sets] = useState(null);
  // useEffect(() => {
  //   if (SelecteddCity === null) {
  //     sets(SelectedCity);
  //   }
  // }, []);
  return (
    <>
      <NabarCompo />

      <div className="row m-auto p-2">
        <div className="col-6">
          <div className="row m-auto mb-5">
            <Form.Select
              value={SelectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {City?.map((ele) => (
                <option value={ele.city} key={ele.city}>
                  {ele.city}
                </option>
              ))}
            </Form.Select>
          </div>
          <h1 className="text-bold">
            {subcategory} in {SelectedCity}
          </h1>
          {serviceData?.map((service, index) => {
            return (
              <div className="row">
                <div className="col-8">
                  <h3>{service.serviceName}</h3>
                  <div className="d-flex mt-3">
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      Start price
                    </p>
                    {Price?.flatMap((ele) => {
                      console.log(Price._id, "Price");
                      return (
                        <div className="row">
                          <p
                            className="col-md-4 mx-2 price"
                            style={{
                              textDecorationLine: "line-through",
                              color: "grey",
                            }}
                          >
                            ₹{ele?.pPrice}
                          </p>
                          <p
                            className="col-md-4"
                            style={{ color: "black", fontWeight: "bold" }}
                          >
                            ₹{ele?.pofferprice}
                          </p>
                        </div>
                      );
                    })}
                    <span>{service.serviceHour}</span>
                  </div>{" "}
                  <div className="row">
                    {service?.morepriceData?.map((moreprice, innerindex) => {
                      return (
                        <div className="col-md-3 area">
                          {moreprice?.pName && (
                            <label htmlFor={moreprice._id} key={moreprice._id}>
                              <input
                                type="radio"
                                name={`bhk-${service._id}`}
                                id={moreprice._id}
                                defaultChecked={innerindex === 0}
                                value={moreprice._id}
                                onClick={() => handleHrSelect(moreprice?._id)}
                              />
                              <span className="col-md-1">
                                {moreprice?.pName?.toUpperCase()}
                              </span>
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p
                    style={{ color: "green" }}
                    onClick={() => handlebookclick(service)}
                  >
                    View details
                  </p>
                </div>

                <div className="col-4">
                  <div style={{ width: "150px", float: "inline-end" }}>
                    <img
                      width={150}
                      height={130}
                      src={`http://localhost:8008/service/${service?.serviceImg}`}
                      alt=""
                      style={{ borderRadius: "10px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        to="/viewcart"
                        state={{
                          passseviceid: service._id,
                          bhk: PriceId,
                          selectecity: SelectedCity,
                        }}
                        key={service.serviceName}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          style={{
                            width: "100px",
                            padding: "8px",
                            background: "gold",
                            color: "green",
                          }}
                        >
                          Add +
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <div className="col-4"></div>
      </div>

      <Modal
        open={subModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header ">
              <div className="col-11">
                <span>Select the subcategory</span>
              </div>
              <div onClick={() => setsubModel(false)}>
                <img
                  width={30}
                  height={30}
                  alt=""
                  src="..\assests\cancel1.png"
                  // style={{}}
                />
              </div>
            </div>
            <h3 className="text-center">{Item?.Subcategory}</h3>
            <div className="row modal_body">
              <div className="col-md-6">
                <h4>{Item?.serviceName}</h4>
                <p>
                  No Of Service Hour {Item?.serviceHour}{" "}
                  <AccessTimeIcon style={{ color: "grey" }} />
                </p>
                <p>
                  No of Service Man {Item?.NofServiceman}{" "}
                  <PeopleIcon style={{ color: "grey" }} />
                </p>

                <p className="p-1" style={{ color: "black" }}>
                  {Item?.subcategory}
                </p>

                <ul
                  style={{ fontSize: 15 }}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  {Item?.serviceDesc?.map((Ele) => (
                    <li>{Ele?.text}</li>
                  ))}
                  {console.log(Item, "item")}
                </ul>
              </div>
              <div className="col-md-4">
                <img
                  style={{ borderRadius: "20px" }}
                  src={`http://localhost:8008/service/${Item?.serviceImg}`}
                  alt=""
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Servicedetails;
