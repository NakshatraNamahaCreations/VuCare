import React, { useEffect, useState } from "react";
import "./paintingservices.scss";
import Ser1 from "./../../../../Assets/Images/ser1.jpg";
import DownArrow from "./../../../../Assets/Images/downarrow.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./../../../../App.css";

export default function PaintingServices() {
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
          ele.subcategory.includes("Painting")
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
    <section className="painting_services white">
      <div className="container">
        <div className="main_heading">
          <h2>Painting Services</h2>
          <span className="red">Asian paints certified</span>
        </div>

        <div className="services_wrapper">
          <div className="row">
            {fewData.map((ele, index) => {
              const capitalizedSubcategory =
                ele.subcategory.charAt(0).toUpperCase() +
                ele.subcategory.slice(1);

              return (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6 mt-3">
                  <div className="services_box">
                    <NavLink
                      className="nvlink"
                      to={`/ServicesView?id=${ele.subcategory}`}
                    >
                      <div className="s_img_wrapper">
                        <img
                          width={200}
                          height={130}
                          src={`http://localhost:8008/subcat/${ele?.subcatimg}`}
                          alt=""
                        />
                      </div>

                      <div className="name">{capitalizedSubcategory}</div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          {categoryData.length > 6 && (
            <span
              className=" view_more"
              style={{ color: "#FE3B00", fontWeight: 700, fontSize: "18px" }}
              onClick={!showAll ? handleShowMore : handleShowLess}
            >
              {!showAll ? "View More" : "View Less"}{" "}
              <img src={DownArrow} alt="" />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
