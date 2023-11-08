import React, { useEffect, useState } from "react";
import "./addon.scss";
import Add from "./../../../../Assets/Images/add.svg";
import AddOnImg from "./../../../../Assets/Images/addon.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function AddOn() {
  const location = useLocation();
  const selectedCategory = new URLSearchParams(location.search).get("id");
  const [categoryData, setCategoryData] = useState([]);
  const [subsubcategory, setsubsubcategory] = useState([]);
  const [Service, setService] = useState([]);
  const [details, setDetails] = useState(false);
  const [BHKId, setBHKId] = useState(null);
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
        setAddOn(res?.data?.AddOns);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let services = Service?.filter((ele, index) => {
    return ele?.Subcategory === selectedCategory;
  });

  return (
    <div className="addon">
      <div className="addon_box">
        {services?.map((ele, index) => {
          let category = ele?.Subcategory?.toLowerCase();

          let matchingAddons = AddOn?.filter((addon) => {
            addon?.addOnsCategory?.toLowerCase()?.includes(category);
            return addon;
          });

          return (
            <div className="addon">
              <div className="addon_box">
                {matchingAddons?.map((addoni, addonIndex) => (
                  <div>
                    <div className="addon_image">
                      <img src={AddOnImg} alt="" />
                      <div className="offer">
                        Up to {addoni.addOnsOfferPrice}% OFF
                      </div>
                    </div>
                    <div className="addon_details">
                      <div className="left">
                        <div className="title">{addoni.addOnsCategory}</div>
                        <div className="price">Rs.{addoni.addOnsPrice}</div>
                      </div>
                      <div className="right">
                        <button>
                          <img src={Add} alt="" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
