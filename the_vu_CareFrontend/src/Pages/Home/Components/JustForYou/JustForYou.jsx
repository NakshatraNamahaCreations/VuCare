import React, { useEffect, useState } from "react";
import axios from "axios";
import "./justforyou.scss";
import JF1 from "./../../../../Assets/Images/jf1.jpg";
import JF2 from "./../../../../Assets/Images/jf2.jpg";
import JF3 from "./../../../../Assets/Images/jf3.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
export default function JustForYou() {
  const [Banner, setBanner] = useState([]);
  const [start1, setStart1] = useState(0);
  useEffect(() => {
    GetAllWebBanner();
  }, []);

  const GetAllWebBanner = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8008/api/website/getallwebbanner"
      );

      if (res.status === 200) {
        setBanner(res.data.banner);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const nextSlide = () => {
    setStart1((prevStart) => (prevStart + 1) % Math.ceil(Banner.length / 3));
  };

  const prevSlide = () => {
    setStart1(
      (prevStart) =>
        (prevStart - 1 + Math.ceil(Banner.length / 3)) %
        Math.ceil(Banner.length / 3)
    );
  };

  const onDotClick1 = (index) => {
    setStart1(index);
  };
  console.log(Banner);
  return (
    <section className="justforyou">
      <div className="container">
        <div className="main_heading">
          <h2>Just For You</h2>
          <span className="red">Newly Launched</span>
        </div>{" "}
        <div className="row">
          <div className="row ">
            <span className="col-md-1">
              <ArrowBackIcon className="prev clr" onClick={prevSlide} />
            </span>
            <span className="col-md-1">
              <ArrowForwardIcon className="next clr" onClick={nextSlide} />
            </span>
          </div>
          <div className="slides-container">
            {Banner?.slice(start1 * 3, (start1 + 1) * 3).map((ele, index) => (
              <div className="slide " key={index}>
                {/* <NavLink to={`/ServicesView?id=${ele._id}`} className="jf_box"> */}
                <img
                  src={`http://localhost:8008/webBanner/${ele?.banner}`}
                  alt={`Slide ${ele?.id}`}
                  className="slider-image"
                />
                {/* </NavLink> */}
              </div>
            ))}
          </div>
          <ul className="dotList text-center">
            {Array.from(
              { length: Math.ceil(Banner.length / 3) },
              (_, index) => (
                <li
                  key={index}
                  className={start1 === index ? "dot active" : "dot"}
                  onClick={() => onDotClick1(index)}
                />
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
