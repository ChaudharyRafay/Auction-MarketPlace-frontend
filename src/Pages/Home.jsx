import React from "react";
import Contact from "../Component/home/ContactUs/Contact";
import Faq from "../Component/home/FAQs/Faq";
import Footer from "../Component/home/Footer/Footer";
import MultiProduct from "../Component/multiProduct/multiProduct";

const Home = () => {
  return (
    <div>
      <MultiProduct />
      <Faq />
      <Contact />
    </div>
  );
};

export default Home;
