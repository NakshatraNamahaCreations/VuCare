import React, { useEffect, useState } from "react";
import "./summary.scss";
import { useSelector } from "react-redux";
import axios from "axios";

import { useLocation } from "react-router-dom";
export default function Summary() {
  //   const cartItems = useSelector(selectCartItems);
  const location = useLocation();
  const selectedCategorybhk = new URLSearchParams(location.search).get("bhk");
  const [Service, setService] = useState([]);
  const [Voucher, setVoucher] = useState([]);

  const selectedCategory = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    getAllServices();
    getVoucher();
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

  const calculateSubtotal = (cartData, cartItems) => {
    let subtotal = 0;

    cartData?.forEach((ele) => {
      ele.morepriceData
        .filter((item) => selectedCategorybhk === item.pName)

        .forEach((filteredElement) => {
          const price = parseFloat(filteredElement?.pofferprice) || 0;
          subtotal += price;
        });
    });

    return subtotal;
  };
  const getVoucher = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8008/api/userapp/getvoucher`
      );
      if (res.status === 200) {
        setVoucher(res.data.voucher);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const subtotal = calculateSubtotal(cartData, selectedCategory);

  let services = Service?.filter((ele, index) => {
    return ele?._id === selectedCategory;
  });

  let k = Voucher.filter((ele) =>
    ele.category
      .toLowerCase()
      .includes(services.map((ele) => ele.category.toLowerCase()))
  );
  console.log(k);
  return (
    <div className="summary">
      <div className="title">Summary</div>
      <div className="summary_points">
        <div className="key">Total Service</div>
        <div className="value">1</div>
      </div>
      <div className="summary_points">
        <div className="key">Sub total</div>
        <div className="value">Rs. {subtotal}</div>
      </div>
      <div className="summary_points">
        <div className="key">Desc </div>
        <div className="value">Rs. 50</div>
      </div>
      <div className="summary_points total">
        <div className="key">Total Amount</div>
        <div className="value">Rs. 4574</div>
      </div>
    </div>
  );
}
