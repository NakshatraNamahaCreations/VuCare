import React, { useEffect, useState } from "react";
import "./header.scss";
import Logo from "./../../Assets/Images/logo.svg";
import OfferIcon from "./../../Assets/Images/offer.svg";
import Profile from "./../../Assets/Images/profile.svg";
import Lock from "./../../Assets/Images/lock.svg";
import Call from "./../../Assets/Images/call.svg";
import UserPlus from "./../../Assets/Images/workwithus.svg";
import { Link, NavLink } from "react-router-dom";
import Down from "./../../Assets/Images/down.svg";
import axios from "axios";
export default function Header(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const [activeLinkID, setActiveLinkID] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [postcategorydata, setpostcategorydata] = useState([]);
  let [SelectedCategory, setSelectedCategory] = useState(null);
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    if (categoryData?.length > 7) {
      setCategory(categoryData?.slice(0, 5));
    } else {
      setCategory(categoryData);
    }
  }, [categoryData]);

  let activeStyle = {
    textDecoration: "underline",
  };

  const handleDropdown = () => {
    setProfile(!profile);
  };

  const handleLink = (id, category) => {
    setActiveLink(!activeLink);
    setActiveLinkID(id);
    setSelectedCategory(category);
  };

  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle(!isToggle);
    setActiveLink(false);
  };

  const getAllCategory = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/getcategory"
      );
      if (res.status === 200) {
        setCategoryData(res.data.category);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const getsubcategory = async () => {
    let res = await axios.post(
      `http://localhost:8008/api/userapp/postappsubcat`,
      {
        category: SelectedCategory,
      }
    );

    if ((res.status = 200)) {
      setpostcategorydata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    try {
      getsubcategory();
    } catch (error) {
      console.error("An error occurred in the fourth useEffect:", error);
    }
  }, [SelectedCategory]);
  // const categoryDataString = JSON.stringify(categoryData);

  return (
    <section className={`navigation   ${props?.className}`}>
      <div className="top">
        <div className="offer">
          <img src={OfferIcon} alt="" />
          <span>New Year Sale is Live | Cleaning Services Upto 60% Off</span>
        </div>
        <div className="link">
          <NavLink
            to="/career"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Career
          </NavLink>
          {!isLogin ? (
            <>
              <NavLink
                to="/login"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Register
              </NavLink>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mobile_toggle">
        <NavLink to="/" className="logo">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div
          className={`toggle_menu ${isToggle ? "active" : ""}`}
          onClick={handleToggle}
        ></div>
      </div>
      <div className="bottom">
        <NavLink to="/" className="logo">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div className="links ">
          {Category.map((item, id) => {
            return (
              <div
                className={`menu_item ${
                  activeLink && activeLinkID === item._id ? "active" : ""
                }`}
                onClick={() => handleLink(item._id, item.category)}
                key={item._id}
              >
                <span>
                  {item?.category}
                  <img src={Down} alt="" />
                </span>
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button className="call">
            <img src={Call} alt="call" />
            8453748478
          </button>
          {isLogin ? (
            <>
              <button className="lock">
                <img src={Lock} alt="lock" />
              </button>
              <div
                className={`profile ${profile ? "active" : ""}`}
                onClick={handleDropdown}
              >
                <img src={Profile} alt="" />
                <div className="pro_name">
                  <h4>John Doe</h4>
                  <span>
                    Account Info <img src={Down} alt="" />
                  </span>
                </div>
              </div>
            </>
          ) : (
            <button className="workwithus">
              <img src={UserPlus} alt="call" />
              Work with us
            </button>
          )}
        </div>
      </div>
      {activeLink ? (
        <div className="drop_down">
          {postcategorydata?.map((menu) => {
            const capitalizedSubcategory =
              menu.subcategory.charAt(0).toUpperCase() +
              menu.subcategory.slice(1);

            return (
              <div className="option" key={menu._id}>
                <a
                  className="bd "
                  href={`/ServicesView?id=${menu.subcategory}`}
                >
                  {capitalizedSubcategory}
                </a>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
