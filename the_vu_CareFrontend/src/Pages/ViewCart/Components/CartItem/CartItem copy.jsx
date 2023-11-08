import React, { useState, useEffect } from "react";
import "./cartitem.scss";
import ItemImg from "./../../../../Assets/Images/item.jpg";
import Delete from "./../../../../Assets/Images/delete.svg";
import { useSelector } from "react-redux";
import axios from "axios";
// import { selectCartItems } from "../../../../dataStoreComponent/viewcartSlice";
import { useLocation } from "react-router-dom";
export default function CartItem() {
  const location = useLocation();
  const selectedCategory = new URLSearchParams(location.search).get("id");
  const [Service, setService] = useState([]);

  useEffect(() => {
    getAllServices();
  }, []);

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

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const filteredService = Service.filter((service) => {
      return selectedCategory === service._id;
    });

    setCartData(filteredService);
  }, [selectedCategory, Service]);

  console.log(selectedCategory)
  return (
    <>
      {cartData?.map((ele) => (
        <div className="cart_item_box">
          <div className="item_title">{ele.serviceName}</div>
          <div className="item_content">
            <div className="left">
              <div className="left_img">
                <img src={ItemImg} alt="" />
              </div>
              <div className="texts">
                <h4>{ele.servicetitle}</h4>
                {/* {ele.morepriceData
                  .filter((item) =>
                    cartItems.find((cartItem) => cartItem.bhk === item.pName)
                  )
                  .map((filteredElement) => (
                    <>
                      <div key={filteredElement.pName}>
                        {filteredElement.pName}
                      </div>
                    </>
                  ))} */}
              </div>
            </div>
            {/* <div className="right">
              {ele.morepriceData
                .filter((item) =>
                  cartItems.find((cartItem) => cartItem.bhk === item.pName)
                )
                .map((filteredElement) => (
                  <>
                    <>
                      <div className="wrong_price">
                        Rs.{filteredElement.pPrice}
                      </div>
                      <div className="real_price">
                        Rs.{filteredElement.pofferprice}
                      </div>
                    </>
                  </>
                ))}{" "}
              <div className="delete">
                <img src={Delete} alt="" />
              </div>{" "}
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
}
