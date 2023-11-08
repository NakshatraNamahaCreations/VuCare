import React from "react";
import Header from "../../Component/Header";
import Testimonial from "../Home/Components/Testimonial/Testimonial";
import Benefits from "./Components/Benefits/Benefits";
import Details from "./Components/Details/Details";
import DetailsWrapper from "./Components/DetailsWrapper/DetailsWrapper";
import FAQs from "./Components/FAQs/FAQs";
import NabarCompo from "../../Component/navbar";

export default function ServicesView() {
  return (
    <>
      <NabarCompo className="full_screen" />
      <Details />
       <Benefits />
      <DetailsWrapper />
     {/* <FAQs />
      <Testimonial /> */}
    </>
  );
}
