import React, { useRef } from "react";
import Contact from "../Component/home/ContactUs/Contact";
import Faq from "../Component/home/FAQs/Faq";
import Footer from "../Component/home/Footer/Footer";
import MultiProduct from "../Component/multiProduct/multiProduct";

const Home = () => {
  const contactRef = useRef();
  return (
    <div>
      <MultiProduct />
      <Faq />
      {/* <Contact /> */}
      <Contact ref={contactRef} />
    </div>
  );
};

export default Home;
