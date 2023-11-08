import React, { useEffect, useState } from "react";
import "./corporatefacility.scss";
import Ser1 from "./../../../../Assets/Images/ser1.jpg";
import DownArrow from "./../../../../Assets/Images/downarrow.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import "./../../../../App.css";

export default function CorporateFacility() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/userapp/getappsubcat"
      );
      if (res.status === 200) {

        let data = res.data.subcategory.filter((ele) =>
          ele.subcategory.includes("Management")
        );
        setCategoryData(data);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  return (
    <section className="corporate">
      <div className="container">
        <div className="main_heading">
          <h2>Corporate Facility Management</h2>
        </div>
        <div className="corporate_wrapper">
          <div className="row">
            {categoryData.map((items, id) => {
              const capitalizedSubcategory =
                items.subcategory.charAt(0).toUpperCase() +
                items.subcategory.slice(1);

              return (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6" key={id}>
                  <NavLink
                    className="nvlink"
                    to={`/ServicesView?id=${items.subcategory}`}
                  >
                    <div className="corporate_box">
                      <img
                        width={160}
                        height={130}
                        src={`http://localhost:8008/subcat/${items?.subcatimg}`}
                        alt=""
                      />
                      <div className="name">{capitalizedSubcategory}</div>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
