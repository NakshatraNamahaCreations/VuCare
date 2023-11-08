import React from "react";
import "./promo.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
export default function Promo() {
  //   const cartItems = useSelector(selectCartItems);
  const location = useLocation();

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

  let services = Service?.filter((ele, index) => {
    return ele?._id === selectedCategory;
  });

  let k = Voucher.filter((ele) =>
    ele.category
      .toLowerCase()
      .includes(services.map((ele) => ele.category.toLowerCase()))
  );

  return (
    <>
      <div className="promo mt-5">
        <div className="title">Promo / Coupon Code</div>
        <form autoComplete="off">
          <input type="text" placeholder="Enter Promocode*" />
          <button type="submit">Submit Now</button>
        </form>
      </div>
    </>
  );
}
