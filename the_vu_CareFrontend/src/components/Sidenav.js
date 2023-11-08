import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebar,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Sidenav() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/logout/${admin?._id}`,
        method: "post",
        baseURL: "http://localhost:8008/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Signout succesfully");

          window.location.assign("/");
          sessionStorage.removeItem("admin");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <ProSidebar>
        <div className="row justify-content-center mt-2">
          <img
            src="../images/vucare.png"
            className="img-fluid"
            style={{ width: "200px" }}
          />
          <h6
            className="text-center pt-1"
            style={{ color: "black", fontWeight: "bold", fontSize: "21px" }}
          >
            VU CARE
          </h6>
        </div>
        <Menu iconShape="square">
          <MenuItem>
            Dashboard <Link to="/home" />
          </MenuItem>

          <SubMenu title="Banners">
            {/* <MenuItem>
              First Slider <Link to="/banner" />
            </MenuItem> */}
            <MenuItem>
              Spotlight Banner
              <Link to="/spotlight" />
            </MenuItem>
            <MenuItem>
              Website Banners
              <Link to="/websitebanner" />
            </MenuItem>
          </SubMenu>

          {/* <SubMenu title="slots"> */}
          {/* <MenuItem>
              Home Page Title <Link to="/homepagetitle" />
            </MenuItem> */}
          <MenuItem>
            Slots
            <Link to="/slots" />
          </MenuItem>
          <MenuItem>
            City
            <Link to="/city" />
          </MenuItem>
          {/* <MenuItem>
              WHy need  vhs
              {/* WHy need 
              <Link to="/feq" />
            </MenuItem>
            <MenuItem>
              Whatsapp and Phone
              <Link to="/whatsappandphonenumber" />
            </MenuItem> 
          {/* </SubMenu> */}

          <MenuItem>
            User Management <Link to="/userManagement" />
          </MenuItem>
          <SubMenu title="Category Management">
            <MenuItem>
              Category <Link to="/category" />
            </MenuItem>
            <MenuItem>
              Subcategory
              <Link to="/subcategory" />
            </MenuItem>
            <MenuItem>
              Sub-subcategory <Link to="/CreateSubcategory" />
            </MenuItem>
          </SubMenu>
          <SubMenu title="Services Management">
            <MenuItem>
              Add Service <Link to="/Service" />
            </MenuItem>
            <MenuItem>
              Service Add-on's
              <Link to="/service-add-ons" />
            </MenuItem>
          </SubMenu>

          <MenuItem>
            Services Booking
            <Link to="/ServiceBooking" />
          </MenuItem>

          {/* <SubMenu title="Voucher and Discount"> */}
          {/* <MenuItem>
            Voucher <Link to="/voucher" />
          </MenuItem> */}
          {/* <MenuItem>
              Offer Banner
              <Link to="/offerbanner" />
            </MenuItem> */}
          {/* </SubMenu> */}

          <MenuItem>
            Payments and Reports
            <Link to="/Paymentsreports" />
          </MenuItem>

          {/* <MenuItem>
            Vendors Management <Link to="/vendor" />
          </MenuItem> */}

          <MenuItem>
            Settings <Link to="/settings" />{" "}
          </MenuItem>
          <MenuItem>
            <a onClick={handleShow}> Logout </a>
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body style={{ fontSize: "20px", textAlign: "center" }}>
            Are you sure you wnat to logout
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={Logout}>
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Sidenav;
