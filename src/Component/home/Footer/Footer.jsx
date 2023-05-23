import React from "react";
import "./footer.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const privacy = () => {
    navigate("/privacy-policy");
  };
  return (
    <div className="f-main">
      <div class="row f-inner">
        <div class="col-lg-4 col-sm-12 f-first-coulmn">
          <img
            className="img-fluid nav-logo"
            src="\asset\hero\logo.png"
            alt="logo"
          />
          <p className="sell-art">
            Discover,Collect,Sell the Best
            <br /> Products
          </p>
        </div>
        <div class="col-lg-4 col-sm-12 f-second-coulmn">
          <div className="f-links">
            <span>
              <a href="#">Privacy Policy</a>
            </span>
            <span>
              <a href="#">term & condition</a>
            </span>
            <span>
              <a href="#">About Us</a>
            </span>
          </div>
          <div className="f-copyright">
            Copyright © 2023 Auction Market. All rights reserved
          </div>
        </div>
        <div class="col-lg-4 col-sm-12 f-third-coulmn">
          <div className="f-social-icons">
            <a href="#" target="_blank">
              <Icon icon="typcn:social-twitter" color="white" width="40" />
            </a>
            <a href="#" target="_blank">
              <Icon icon="ic:round-discord" color="white" width="40" />
            </a>
            <a href="#" target="_blank">
              <Icon icon="ic:sharp-telegram" color="white" width="40" />
            </a>
            <a href="#" target="_blank">
              <Icon icon="ri:medium-fill" color="white" width="40" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
