import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import "./hero.scss";
import axios from "axios";
import searchIcon from "../../../../Assets/Images/search.svg";
import { NavLink, Link } from "react-router-dom";

export default function Hero() {
  const [City, setCity] = useState([]);
  const [SearchSubCategory, setSearchSubCategory] = useState("");
  const [SearchSubCategoryd, setSearchSubCategoryD] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);

  const [selectedOption, setSelectedOption] = useState({
    value: "0",
    text: "Select City",
    icon: (
      <svg id="flag-icons-in" viewBox="0 0 640 480">
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <g transform="matrix(3.2 0 0 3.2 320 240)">
          <circle r="20" fill="#008" />
          <circle r="17.5" fill="#fff" />
          <circle r="3.5" fill="#008" />
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="a" fill="#008">
                  <circle r=".9" transform="rotate(7.5 -8.8 133.5)" />
                  <path d="M0 17.5.6 7 0 2l-.6 5L0 17.5z" />
                </g>
                <use width="100%" height="100%" transform="rotate(15)" />
              </g>
              <use width="100%" height="100%" transform="rotate(30)" />
            </g>
            <use width="100%" height="100%" transform="rotate(60)" />
          </g>
          <use width="100%" height="100%" transform="rotate(120)" />
          <use width="100%" height="100%" transform="rotate(-120)" />
        </g>
      </svg>
    ),
  });
  const [openResetModal, setOpenResetModal] = useState(false);
  const handleResetModal = () => {
    setOpenResetModal(!openResetModal);
  };
  useEffect(() => {
    getCity();
    getsubcategory();
  }, []);
  const handleChange = (e) => {
    setSelectedOption(e);
    setOpenResetModal(false);
  };

  const getCity = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res.data.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };
  const getsubcategory = async () => {
    let res = await axios.get(
      `http://localhost:8008/api/userapp/getappsubcat`
    );

    if ((res.status = 200)) {
      setCategoryData(res.data.subcategory);
    }
  };

  const handleSearch = (e) => {
    if (SearchSubCategoryd.lenght > 0) {
      setSearchSubCategoryD(" ");
    }
    const searchTerm = e.target.value.toLowerCase();
    setSearchSubCategory(searchTerm);
    const filterData = CategoryData.filter((ele) => {
      const data = ele.subcategory.toLowerCase();
      return data.includes(searchTerm);
    });

    let d = filterData?.map((ele) => ele.subcategory);
    setSearchSubCategoryD(d);
    localStorage.setItem("cityname", selectedOption?.city);
  };

  const handelsubcatgoryset = (e) => {
    try {
      setSearchSubCategory(e);
    } catch (er) {}
  };

  const handleLinkClick = () => {
    if (SearchSubCategory === "" || selectedOption?.city.length === 0) {
      alert("Please Select city or service");
    } else {
      window.location.href = `/ServicesView?id=${SearchSubCategory}`;
    }
  };

  return (
    <section className="hero ">
      <div className="hero_text mt-5">
        <div className="welcome ">
          Welcome to <span>Vijay Home Services</span>
        </div>
        <div className="title ">
          <span>trusted</span> & Best Home services in India
        </div>
      </div>
      <div className="search mb-4">
        <div onClick={handleResetModal} className="select-city ">
          {selectedOption.city === null || selectedOption.city === undefined
            ? "Select City"
            : selectedOption.city}
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            class="css-tj5bde-Svg"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        </div>
        <Modal open={openResetModal} onClose={openResetModal}>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header">
              <div className="col-12">
                <span>Let's choose</span>
                <p>Your Location</p>
              </div>
            </div>

            <div className="modal_body">
              <div className="title text-center">India</div>
              <div className="row">
                {City.map((city) => {
                  return (
                    <div className="col-lg-2 col-md-3 col-sm-4">
                      <div
                        className="city-name"
                        onClick={() => handleChange(city)}
                      >
                        <img src="" alt="" />

                        <p className="p-1">{city.city}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
        <div className="row ">
          <div onClick={handleLinkClick} style={{ cursor: "pointer" }}>
            <span className="col-md-2 m-auto text-center">
              <img
                width={24}
                height={24}
                src={searchIcon}
                alt=""
                style={{
                  position: "absolute",
                  zIndex: "100",
                  bottom: "39.5%",
                }}
              />
            </span>
          </div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Services"
            value={SearchSubCategory}
            onChange={handleSearch}
          />
          <div
            className={` ${
              SearchSubCategory.length <= 0
                ? "drpshow"
                : "drop_dow shadow-sm p-3 mb-5 bg-white rounded"
            }`}
          >
            {SearchSubCategoryd?.map((ele) => (
              <p
                onClick={() => handelsubcatgoryset(ele)}
                style={{ cursor: "pointer" }}
              >
                {ele}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
