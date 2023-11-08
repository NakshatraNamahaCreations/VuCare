import React, { useEffect, useState } from "react";
import "./addon.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AddOn() {
  const location = useLocation();
  const selectedCategory = new URLSearchParams(location.search).get("id");

  const [Service, setService] = useState([]);

  const [AddOn, setAddOn] = useState([]);
  useEffect(() => {
    getAllServices();
    getAddons();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getservices"
      );
      if (res.status === 200) {
        setService(res?.data?.service);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const getAddons = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8008/api/userapp/getServiceAddOns`
      );
      if (res.status === 200) {
        setAddOn(
          res?.data?.AddOns.filter((i) => i.addOnsCategory === selectedCategory)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  let services = Service?.filter((ele, index) => {
    return ele?.serviceName === selectedCategory;
  });
  let cate = services?.map((ele) => ele?.serviceName?.toLowerCase());

  const filteredAddons = AddOn?.filter((addon) => {
    const addonCategory = addon?.addOnsCategory?.toLowerCase();
    return addonCategory.includes(cate);
  });

  return (
    <div className="addon">
      {filteredAddons?.map((addon) => (
        <div key={addon._id} className="addon_box">
          <div className="addon_image">
            <div className="offer">Up to {addon.addOnsOfferPrice}% OFF</div>
          </div>
          <div className="addon_details">
            <div className="left">
              <div className="title">{addon.addOnsCategory}</div>
              <div className="price">Rs.{addon.addOnsPrice}</div>
            </div>
            <div className="right">
              <button>Add</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
