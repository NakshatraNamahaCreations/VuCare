import React, { useEffect, useState } from "react";
import "./pestservices.scss";
import Ser1 from "./../../../../Assets/Images/ser1.jpg";
import DownArrow from "./../../../../Assets/Images/downarrow.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import "./../../../../App.css";

export default function PestServices() {
  const [showAll, setShowAll] = useState(false);
  const [fewData, setFewData] = useState([]);
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
          ele.subcategory.includes("Pest control")
        );
        setCategoryData(data);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  useEffect(() => {
    if (categoryData?.length > 7) {
      setFewData(categoryData.slice(0, 6));
    } else {
      setFewData(categoryData);
    }
  }, [categoryData]);

  const handleShowMore = () => {
    setFewData(categoryData);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setFewData(categoryData.slice(0, 6));
    setShowAll(false);
  };

  return (
    <section className="pest_services">
      <div className="container">
        <div className="main_heading">
          <h2>Pest Control Services</h2>
          <span className="yellow">Approved Government License</span>
        </div>
        <div className="services_wrapper">
          <div className="row">
            {fewData.map((ele, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6 mt-3">
                <div className="services_box ">
                  <NavLink
                    className="nvlink"
                    to={`/ServicesView?id=${ele.subcategory}`}
                  >
                    <div className="s_img_wrapper">
                      <img
                        width={160}
                        height={130}
                        src={`http://localhost:8008/subcat/${ele?.subcatimg}`}
                        alt=""
                      />
                    </div>

                    <div className="name">{ele.subcategory}</div>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
        {categoryData.length > 6 && (
          <div className="">
            <span
              className=" view_more"
              style={{ color: "#FE3B00", fontWeight: 700, fontSize: "18px" }}
              onClick={!showAll ? handleShowMore : handleShowLess}
            >
              {!showAll ? "View More" : "View Less"}{" "}
              <img src={DownArrow} alt="" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
