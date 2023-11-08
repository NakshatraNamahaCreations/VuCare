import React, { useEffect, useState } from "react";
import "./serviceslist.scss";
import ServicesIcon from "./../../../../Assets/Images/services.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function ServicesList() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    let res = await axios.get(
      `http://localhost:8008/api/userapp/getappsubcat`
    );

    if ((res.status = 200)) {
      setCategoryData(res.data.subcategory);
    }
  };

  const [showAll, setShowAll] = useState(false);
  const [fewData, setFewData] = useState([]);

  useEffect(() => {
    if (categoryData.length >= 10) {
      setFewData(categoryData.slice(0, 11));
    } else {
      setFewData(categoryData);
    }
  }, [categoryData]);

  const handleShowMore = () => {
    setFewData(categoryData);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setFewData(categoryData.slice(0, 11));
    setShowAll(false);
  };

  return (
    <section className="services_list mt-4">
      <div className="container">
        <div className="services_list_wrapper">
          {fewData?.map((item) => {
            const capitalizedSubcategory =
              item.subcategory.charAt(0).toUpperCase() +
              item.subcategory.slice(1);

            return (
              <NavLink
                to={`/ServicesView?id=${item?.subcategory}`}
                className="services_box"
                key={item._id}
                style={{ borderBottom: "1px solid #dde2e8" }}
              >
                <img
                  className="row m-1"
                  width={60}
                  height={60}
                  style={{ borderRadius: "5px" }}
                  src={`http://localhost:8008/subcat/${item?.subcatimg}`}
                  alt=""
                />

                <div className="col-md-11 m-auto name">
                  {capitalizedSubcategory}
                </div>
              </NavLink>
            );
          })}

          {categoryData.length > 9 && (
            <div
              className="services_box"
              onClick={!showAll ? handleShowMore : handleShowLess}
            >
              <div className="more_count">
                <p className="fnt" style={{ color: "skyblue" }}>
                  {!showAll ? "Show More" : "Show Less"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
