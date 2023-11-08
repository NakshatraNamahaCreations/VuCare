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
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
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
  const [addService, setAddService] = useState(null);
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
    setpricesdata(clickedItem?.morepriceData);
    setItem(clickedItem);

    setsubModel(true);
    // window.location.assign("/");
  };
  const [Price, setPrices] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const handleHrSelect = (hr) => {
    const filteredData = serviceData
      .map((ele) => ele.morepriceData.find((item) => item._id === hr))
      .filter((item) => item !== undefined);
    setPrices(filteredData);
    console.log(filteredData._id);
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
  const handleAdd = (index) => {
    setAddService(addService === index ? null : index);
  };
  return (
    <div>
      <NabarCompo />
      <div className="col-md-3 m-auto">
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
      <div style={{ margin: 25 }}>
        <div className="row">
          <div className="col-6">
            <h1>
              {" "}
              {subcategory} in {SelectedCity}
            </h1>
            {serviceData?.map((i, index) => {
              return (
                <div className="row">
                  <div className="col-8">
                    <h2 style={{ fontWeight: "bold", color: "black" }}>
                      {i.serviceName}
                    </h2>
                    <div className="d-flex mt-3">
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        Start price
                      </p>
                      {Price?.flatMap((ele) => (
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
                      ))}
                      <span>{i.serviceHour}</span>
                    </div>{" "}
                    <div className="row">
                      <div className="row">
                        {i?.morepriceData?.map((ele, index) => {
                          return (
                            <div className="col-md-5 area" key={ele._id}>
                              {ele.pName && (
                                <label htmlFor={ele._id}>
                                  <input
                                    type="radio"
                                    name="bhk"
                                    id={ele._id}
                                    value={ele.pName}
                                    onClick={() => handleHrSelect(ele._id)}
                                    checked={
                                      ele.pName === "1BK" ||
                                      ele.pName === "1BHK"
                                    }
                                  />
                                  <span className="col-md-1">{ele?.pName}</span>
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="d-flex">
                      <img
                        width={20}
                        height={20}
                        src={`http://localhost:8008/service/${i?.Eximg}`}
                        alt=""
                      />{" "}
                      <p
                        style={{
                          marginLeft: 10,
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {i.offerPrice}
                      </p>
                      <p
                        style={{ fontSize: 15 }}
                        numberOfLines={4}
                        ellipsizeMode="tail"
                      >
                        {i.serviceDesc[0]?.text}
                      </p>
                    </div>
                    {/* <p style={{ color: "green" }}>View details</p> */}
                  </div>

                  <div className="col-4">
                    <div style={{ width: "150px", float: "inline-end" }}>
                      <img
                        width={150}
                        height={130}
                        src={`http://localhost:8008/service/${i?.serviceImg}`}
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
                            passseviceid: i._id,
                            bhk: PriceId,
                            selectecity: SelectedCity,
                          }}
                          key={i.serviceName}
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            style={{
                              width: "100px",
                              padding: "8px",
                              background: "gold",
                              color: "green",
                            }}
                            onClick={() => handleAdd(index)}
                          >
                            {addService !== index ? (
                              <>
                                <AddIcon /> Add
                              </>
                            ) : (
                              <>
                                <CheckIcon /> Added
                              </>
                            )}
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
      </div>

      {/* <Modal
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
                  width={50}
                  height={50}
                  alt=""
                  src="..\assests\cancel1.png"
                  // style={{}}
                />
              </div>
            </div>

            <div className="modal_body">
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {filtersub?.map((item) => (
                  <Link
                    to="/viewcart"
                    state={{ subcategory: item?._id }}
                    key={item.subcategory}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        // border: "1px solid green",
                        width: "150px",
                        height: "160px",
                        boxShadow: "0px 0px 5px 1px green",
                      }}
                    >
                      <img
                        src={`http://localhost:8008/subcat/${item.subcatimg}`}
                        width="100%"
                        height="100px"
                      />

                      <p className="p-1" style={{ color: "black" }}>
                        {item.subcategory}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

      {/* <ViewCart />  */}
    </div>
  );
}

export default Servicedetails;
