import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import axios from "axios";
import img from "./img/Flag-India.webp";
import NabarCompo from "./navbar";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import "./header.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  const [city, setCity] = useState([]);
  const [SearchSubCategory, setSearchSubCategory] = useState("");
  const [SearchSubCategoryd, setSearchSubCategoryD] = useState([]);
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(true);
  const [CategoryData, setCategoryData] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);

  useEffect(() => {
    getCity();
    getsubcategory();
  }, []);
  const getsubcategory = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8008/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err, "err while fetching data");
    }
  };
  const getCity = async () => {
    try {
      let res = await axios.get("http://localhost:8008/api/master/getcity");
      if (res.status === 200) {
        setCity(res.data.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

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

  const handleResetModal = () => {
    setOpenResetModal(!openResetModal);
  };
  const handleChange = (e) => {
    setSelectedOption(e);
    setOpenResetModal(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchSubCategory(searchTerm);
    setIsDropdownEnabled(searchTerm.length === 0);

    const filterData = CategoryData.filter((ele) => {
      const data = ele.subcategory.toLowerCase();

      return data.includes(searchTerm);
    });

    const subcategories = filterData.map((ele) => ele.subcategory);
    setSearchSubCategoryD(subcategories);
  };
  const handleSubcategorySelect = (ele) => {
    setSearchSubCategory(ele);
    setIsDropdownEnabled(true);
  };

  const handleLinkClick = () => {
    if (SearchSubCategory === "" || selectedOption?.city?.length === 0) {
      alert("Please Select city or service");
    }
  };
  const CustomInputBase = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#F5F6F8",
    border: "1px solid #E2E6EA",
    borderRadius: "8px",
    padding: "8px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      borderColor: "#B0B6BE",
    },
    "&.Mui-focused": {
      borderColor: "#006BFF",
      boxShadow: `${alpha("#006BFF", 0.25)} 0 0 0 0.2rem`,
    },
    "& .MuiInputBase-input": {
      padding: "8px 12px",
    },
  }));

  return (
    <div className=" bgimg">
      <NabarCompo />

      <div className="container mt-5">
        <div className="row justify-content-end">
          <div className="col-md-6 mt-5">
            <div className="row m-auto">
              <h3 className="fnt  fw-bolder">
                Ultimate Level Of Cleaning Power
              </h3>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div className="row   justify-content-end">
          <div className="col-md-7 mt-5 ">
            <div className="row inputbox">
              {/* <div className="col-md-4  inputbox1 shadow-sm me-1   bg-white p-3  brd">
                <div className="row me-3">
                  <div className="col-md-3 text-center ">
                    <img
                      src={img}
                      width={30}
                      height={30}
                      className=" imgbr custom-dropdown-toggle"
                      alt="Flag"
                    />
                  </div>
                  <div
                    className="col-md-9 select-city"
                    onClick={handleResetModal}
                  >
                    <span>
                      {selectedOption.city === null ||
                      selectedOption.city === undefined
                        ? "Select City"
                        : selectedOption.city}
                    </span>
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
                  </div>{" "}
                </div>
              </div> */}
              <div className="col-md-4">
                <CustomInputBase
                  className="shadow-sm me-1   bg-white"
                  readOnly
                  value={
                    selectedOption.city === null ||
                    selectedOption.city === undefined
                      ? "Select City"
                      : selectedOption.city
                  }
                  startAdornment={
                    <img
                      src={img}
                      width={30}
                      height={30}
                      className=" imgbr custom-dropdown-toggle"
                      alt="Flag"
                    />
                  }
                  endAdornment={
                    <svg
                      onClick={handleResetModal}
                      height="40"
                      width="40"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  }
                />
              </div>
              <div className="col-md-7">
                <CustomInputBase
                  placeholder="Search for services"
                  value={SearchSubCategory}
                  defaultValue="Your Default Value Here"
                  onChange={handleSearch}
                  startAdornment={
                    <Link
                      onClick={handleLinkClick}
                      to="/servicedetails"
                      state={{
                        subcategory: SearchSubCategory,
                        SelecteddCity: selectedOption.city,
                      }}
                      key={SearchSubCategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <SearchIcon
                        style={{ fontSize: "30px" }}
                        onClick={handleLinkClick}
                      />
                    </Link>
                  }
                />
                {!isDropdownEnabled && (
                  <div className="drop_dow shadow-sm p-3 mb-5 bg-white rounded">
                    {SearchSubCategoryd?.map((ele) => (
                      <p
                        key={ele}
                        onClick={() => handleSubcategorySelect(ele)}
                        style={{ cursor: "pointer" }}
                      >
                        {ele}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openResetModal} onClose={handleResetModal}>
        <div className="modal_wrapper select-city-modal">
          <div className="modal_header ">
            <div className="col-12">
              <span>Let's choose</span>
              <p>Your Location</p>
            </div>
          </div>

          <div className="modal_body">
            <div className="title text-center">India</div>
            <div className="row">
              {city.map((city) => {
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
    </div>
  );
}
