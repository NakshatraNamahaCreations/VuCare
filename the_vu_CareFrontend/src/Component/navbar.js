import React from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
export default function NabarCompo() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="clr fnt bg-white  rounded-lg brd p-1" href="/">
          <img
            src="..\assests\Screenshot_4-removebg-preview.png"
            width={216}
            height={36}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="clr fnt me-2">
            <Button className="text-dark" variant="outlined" size="medium">
              Help
            </Button>
          </Nav>
          <Nav className="clr fnt">
            <Button
              className="text-dark  me-2"
              variant="outlined"
              size="medium"
              href="/login"
            >
              Login
            </Button>
            <Button
              className="text-dark  me-2"
              variant="outlined"
              size="medium"
              href="/register"
            >
              Sign Up
            </Button>
          </Nav>
          <Nav className="clr fnt me-2">
            <Button variant="outlined" size="medium">
              <span className="me-2">
                <WifiCalling3Icon style={{ color: "skyblue" }} />
              </span>{" "}
              <span className="text-dark">+91 74658903324</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
