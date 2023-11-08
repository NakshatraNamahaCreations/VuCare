import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import Review from "./review";
import Modal from "@mui/material/Modal";

export default function Home() {
  const [Banner, setBanner] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selcategory, setselcategory] = useState("");
  const [filtersub, setfiltersub] = useState([]);
  const [subModel, setsubModel] = useState(false);

  const handleResetModal = () => {
    setsubModel(!subModel);
  };
  useEffect(() => {
    GetAllWebBanner();

    getAllCategory();
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

  const filtercatsub = (cat) => {
    setselcategory(cat);
    setsubModel(true);
  };

  useEffect(() => {
    getsubcategory();
  }, [selcategory]);

  const getsubcategory = async () => {
    let res = await axios.get(`http://localhost:8008/api/userapp/getappsubcat`);

    if ((res.status = 200)) {
      setCategoryData(res.data.subcategory);
      setfiltersub(
        res.data.subcategory.filter(
          (i) => i.category?.toLowerCase() === selcategory?.toLowerCase()
        )
      );
    }
  };

  const getAllCategory = async () => {
    try {
      let res = await axios.get("http://localhost:8008/api/getcategory");
      if (res.status === 200) {
        const firstInFirstOut = res.data.category.reverse();
        setCategory(firstInFirstOut);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const cleaningItemsCount = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("cleaning")
  )?.length;

  const actualCleaningSlidesToShow = Math?.min(cleaningItemsCount, 6);

  const pestControlItemsCount = categoryData?.filter((item) =>
    item?.category?.toLowerCase()?.includes("control")
  )?.length;

  const actualPestControlSlidesToShow = Math.min(pestControlItemsCount, 6);

  const paintingcontorl = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("painting")
  )?.length;

  const painitnca = Math.min(paintingcontorl, 6);

  const cleaningSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: actualCleaningSlidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    initialSlide: 0,
  };

  const actualPaintingSetting = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: painitnca,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    initialSlide: 0,
  };
  // const actualPaintingSetting = {
  //   dots: true,
  //   infinite: true,
  //   speed: 900,
  //   slidesToShow: painitnca,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   cssEase: "ease-in-out",
  //   initialSlide: 0,
  // };
  const pestControlSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: actualPestControlSlidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    initialSlide: 0,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <>
      <div className="container mrgn">
        <div className="row  medis3 medis m-auto">
          <div className="col-md-3  clr2 medis1 ">
            <div className="row  p-2 m-1 medis1 brclr">
              <div className="col-md-6  m-auto">
                <p className="fnt16 textsi fsd m-2 row m-auto clr3 boldt text-white">
                  Our Motive Is To Make You Comfort In Your Home
                </p>
              </div>
              <div className="col-md-6 ">
                <img
                  className="crdbor brclr imgd firstcart imgs"
                  src="..\assests\house.avif"
                  alt=""
                />
                <div className="row">
                  <button className="col-md-10 mb-3 p-2 btn yellw clr2 grndclr  ">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {category.reverse()?.map((ele) => (
            <div className="col-md-2  medis2 clr2 clr3 crdbor p-3  m-auto pe-auto  cursor">
              {/* <Link
                to={`/ServicesView?id=${ele.category}`}
                className="text-decoration-none text-white"
              > */}
              <a onClick={() => filtercatsub(ele.category)}>
                <div className="row m-auto">
                  <img
                    className="col-md-6 imgsub "
                    width={50}
                    height={50}
                    categoryImg
                    src={`http://localhost:8008/category/${ele?.categoryImg}`}
                    alt=""
                  />{" "}
                </div>
                <div className="row m-auto">
                  {" "}
                  <p className="col-md-12  fnt14 textsi  boldt">
                    {ele?.category}
                  </p>
                </div>
              </a>
              {/* </Link> */}
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <h2 className="text-center boldt">Just For You</h2>
          <div className="row text-center">
            <button className="col-md-2 m-auto btnd clr3 clr2 yellw1 p-2 boldbtn">
              Newly Lounched
            </button>{" "}
          </div>
          <div className="row mt-3 slick-listsd">
            <Slider {...settings}>
              {Banner.map((item) => (
                <div key={item.id}>
                  <img
                    width={200}
                    height={150}
                    src={`http://localhost:8008/webBanner/${item.banner}`}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="row mt-5">
          <h2 className="text-center boldt">Pest Control</h2>

          <div className="row mt-3 slick-listsd">
            <Slider {...pestControlSettings}>
              {categoryData
                .filter((item) =>
                  item.category.toLowerCase().includes("control")
                )
                .map((item) => (
                  <div key={item._id} className="m-auto slider-item">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: item?.subcategory }}
                      key={item.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <img
                        width={150}
                        height={150}
                        src={`http://localhost:8008/subcat/${item?.subcatimg}`}
                        className=" shadow-none bg-light rounded"
                        alt=""
                      />
                      <p className="col-md-10 text-center m-auto p-2 boldt">
                        {item.subcategory}
                      </p>
                    </Link>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className="row mt-5">
          <Card className="borderrad">
            <img
              className="border1"
              src="..\assests\pest-control-services--1536x512.jpg"
              height={250}
            />
          </Card>
        </div>

        <div className="row mt-5">
          <h2 className="text-center">Cleaning Services</h2>
          <div className="row text-center">
            <button className="col-md-3 m-auto btnd clr3 clr2 p-2 yellw1 boldbtn">
              30% Less Than Market Price
            </button>{" "}
          </div>
          <div className="row mt-3 slick-listsd">
            <Slider {...cleaningSettings}>
              {categoryData
                .filter((item) =>
                  item.category.toLowerCase().includes("cleaning ")
                )
                .map((ele) => (
                  <div key={ele._id} className="m-auto slider-item">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      {" "}
                      <img
                        width={150}
                        height={150}
                        src={`http://localhost:8008/subcat/${ele?.subcatimg}`}
                        className=" shadow-none bg-light rounded"
                        alt=""
                      />
                      <p className="text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className="row mt-5">
          <h2 className="text-center">Painting Services</h2>
          <div className="row text-center">
            <button className="col-md-3 m-auto btnd clr3 clr2 p-2 yellw1 boldbtn">
              Asian Paints Certified
            </button>{" "}
          </div>
          <div className="row mt-3 slick-listsd">
            <Slider {...actualPaintingSetting}>
              {categoryData
                .filter((item) =>
                  item.category.toLowerCase().includes("painting")
                )
                .map((ele) => (
                  <div key={ele._id} className="m-auto slider-item">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      {" "}
                      <img
                        width={150}
                        height={150}
                        src={`http://localhost:8008/subcat/${ele?.subcatimg}`}
                        className=" shadow-none bg-light rounded"
                        alt=""
                      />
                      <p className="text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        {/* <div className="row mt-5">
          <h2 className="text-center">Painting Services</h2>
          <div className="row text-center">
            <button className="col-md-3 m-auto btnd clr3 clr2 p-2 yellw1 boldbtn">
              Asian Paints Certified
            </button>{" "}
          </div>
          <div className="row mt-3 slick-listsd">
            <Slider {...actualPaintingSetting}>
              {categoryData
                .filter((item) =>
                  item.category.toLowerCase().includes("painting")
                )
                .map((ele) => (
                  <div key={ele._id} className="m-auto slider-item">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      {" "}
                      <img
                        width={150}
                        height={150}
                        src={`http://localhost:8008/subcat/${ele?.subcatimg}`}
                        className=" shadow-none bg-light rounded"
                        alt=""
                      />
                      <p className="text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                ))}
            </Slider>
          </div>
        </div> */}

        <div className="row mt-5">
          <Card className="borderrad">
            <img className="border1" src="..\assests\ggg-01.png" />
          </Card>
        </div>

        <Review />

        <div className="row mt-5 mb-5 p-1" style={{ position: "relative" }}>
          <h2 className="text-center boldt">Why Choose Us?</h2>

          <div className="container mt-3 p-5 rdiu clr2 p-5">
            <p className="yellw1 fs-4">Exceptional Expertise:</p>
            <p className="clr3 fsd">
              Our home services company boasts a team of highly skilled
              professionals with years of experience,ensuring top-notch service
              quality and efficient solutions for all your home needs.
            </p>
            <p className="yellw1 fs-4">Customer-Centric Approach:</p>
            <p className="clr3 fsd">
              We prioritize your satisfaction and convenience,tailoring our
              services to your unique requirements,our dedicated team listens
              attentively and delivers personalized solutions that align with
              your expectations.
            </p>
            <p className="yellw1 fs-4">Reliability And Trust:</p>
            <p className="clr3 fsd">
              Count on us for dependable,trustworthy service. We value
              transparency,punctuality.and a strong work ethic,providing peace
              of mind knowing your home is in capable and caring hands.
            </p>
          </div>
          <div
            className="row m-auto "
            style={{ position: "absolute", top: "88%" }}
          >
            <div className="col-md-2 m-auto p-1 text-center  rdiu2">
              <img
                width={50}
                height={50}
                src="..\assests\icons8-expert-48.png"
              />
              <p className="grndclr boldt ">Experts Only </p>
            </div>
            <div className="col-md-2 m-auto  p-1 text-center rdiu2">
              <img
                width={50}
                height={50}
                src="..\assests\icons8-house-48.png"
              />
              <p className="grndclr boldt ">Fully Equipped </p>
            </div>
            <div className="col-md-2 m-auto text-center p-1 rdiu2">
              <img
                width={50}
                height={50}
                src="..\assests\icons8-business-team-61.png"
              />
              <p className="grndclr boldt ">No Subcontract </p>
            </div>
          </div>
        </div>

        <Modal
          open={subModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <div className="modal_wrapper select-city-modal">
              <div className="modal_header ">
                <div className="col-11">
                  <span>Select the subcategory</span>
                </div>
                <a onClick={() => setsubModel(false)}>
                  <img
                    width={50}
                    height={50}
                    src="..\assests\cancel1.png"
                    // style={{}}
                  />
                </a>
              </div>

              <div className="modal_body">
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {filtersub.map((item) => (
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: item?.subcategory }}
                      key={item.subcategory}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          // border: "1px solid green",
                          width: "150px",
                          height: "160px",
                          boxShadow: "0px 0px 5px 1px green",
                        }}
                      >
                        <img
                          src={`http://localhost:8008/subcat/${item.subcatimg}`}
                          width="100%"
                          height="100px"
                        />

                        <p className="p-1" style={{ color: "black" }}>
                          {item.subcategory}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
