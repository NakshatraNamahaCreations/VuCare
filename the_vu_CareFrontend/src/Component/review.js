import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
export default function Review() {
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
  const reviw = [
    {
      img: "../assests/prfil4.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil2.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil1.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
    {
      img: "../assests/prfil4.jfif",
      review:
        "Hi The Vu Care   team ws very good in work wise, hard working  made my home look neat n tidy   staff behaviour ws good and all the services  completed they were in time reached my place Bangarpet   I Recommend the vucare for the Vu Care thank u for the service",
    },
  ];

  return (
    <div className="row mt-5">
      <h2 className="text-center boldt">Review</h2>

      <div className="row mt-3 ">
        <Slider {...settings}>
          {reviw.map((item) => (
            <div key={item.id} className="slider-item ">
              <div className=" bg-dark m-2  text-white rdi">
                <div className="row text-center">
                  <img
                    src={item.img}
                    className="col-md-3 m-auto"
                    alt={`Image ${item.id}`}
                    style={{ borderRadius: "100%" }}
                  />
                  <p>
                    <span>
                      <StarIcon className="yellw1" />
                    </span>
                    <span>
                      <StarIcon className="yellw1" />
                    </span>
                    <span>
                      <StarIcon className="yellw1" />
                    </span>
                    <span>
                      <StarIcon className="yellw1" />
                    </span>
                  </p>
                </div>
                <p className="col-md-10 fnt12 text-center m-auto p-2 boldt">
                  {item.review}
                </p>
              </div>{" "}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
