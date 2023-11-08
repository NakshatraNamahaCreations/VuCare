import React, { useEffect, useState } from "react";
import "./detailswrapper.scss";
import Package from "../Package/Package";

import Testimonial from "../Testimonial/Testimonial";
import "../AddOn/addon.scss";
import "../CallBack/callback.scss";
import Add from "./../../../../Assets/Images/add.svg";

import { useLocation } from "react-router-dom";
import axios from "axios";
export default function DetailsWrapper() {
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
    <section className=" details_wrapper_page ">
      <div className="container">
        <div className="row ">
          <div className="col-md-8 m-auto">
            <div className="package_title">{selectedCategory}</div>
            <Package />
          </div>
          <div className="col-md-4">
            <Testimonial />
          </div>
        </div>
      </div>
    </section>
  );
}
