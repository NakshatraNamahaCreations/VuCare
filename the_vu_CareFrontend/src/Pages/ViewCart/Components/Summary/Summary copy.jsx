import React, { useEffect, useState } from "react";
import "./summary.scss";
import { useSelector } from "react-redux";
import axios from "axios";
// import { selectCartItems } from "../../../../dataStoreComponent/viewcartSlice";
export default function Summary() {
  // const cartItems = useSelector(selectCartItems);
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

  // useEffect(() => {
  //   const filteredService = Service.filter((service) => {
  //     return cartItems.some((cartItem) => cartItem.id === service._id);
  //   });

  //   setCartData(filteredService);
  // }, [cartItems, Service]);

  const calculateSubtotal = (cartData, cartItems) => {
    let subtotal = 0;

    cartData?.forEach((ele) => {
      ele.morepriceData
        .filter((item) =>
          cartItems.find((cartItem) => cartItem.bhk === item.pName)
        )
        .forEach((filteredElement) => {
          const price = parseFloat(filteredElement?.pofferprice) || 0;
          subtotal += price;
        });
    });

    return subtotal;
  };

  // const subtotal = calculateSubtotal(cartData, cartItems);
  // console.log(cartItems);
  return (
    <div className="summary">
      <div className="title">Summary</div>
      <div className="summary_points">
        <div className="key">Total Service</div>
        {/* <div className="value">{cartItems?.length}</div> */}
      </div>
      <div className="summary_points">
        <div className="key">Sub total</div>
        {/* <div className="value">Rs. {subtotal}</div> */}
      </div>
      <div className="summary_points">
        <div className="key">Tax </div>
        <div className="value">Rs. 50</div>
      </div>
      <div className="summary_points total">
        <div className="key">Total Amount</div>
        <div className="value">Rs. 4574</div>
      </div>
    </div>
  );
}
