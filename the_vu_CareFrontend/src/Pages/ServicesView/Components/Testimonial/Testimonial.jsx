import React from "react";
import "./testimonial.scss";
import testi from "./../../../../Assets/Images/thumbnail.jpg";
import PlyBtn from "./../../../../Assets/Images/ply.svg";
export default function Testimonial() {
  return (
    <div className="row service_testimonial">
      <div className="title">Testimonial</div>
      <div className="video">
        <img  src={testi} alt="" />
        <button>
          <img src={PlyBtn} alt="" />
        </button>
      </div>
      <div className="name">Mr. Chakradhar GS</div>
      <div className="services_name">Deep Cleaning & Interior Painting</div>
      <button>Watch More Video</button>
    </div>
  );
}
