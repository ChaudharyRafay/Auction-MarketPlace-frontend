import React, { useEffect, useState } from "react";
import "./multiproduct.scss";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
const MultiProduct = () => {
  const [products, setproducts] = useState([]);
  const [trendingProduct, settrendingProduct] = useState([]);

  var settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "0px",
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 787,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2.2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  var settingCollection = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "0px",
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 787,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1.7,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const liveAuctionCard = [
    {
      name: "The Hammer",
      productID: 16,
      price: 33000,
    },

    {
      name: "Iron Man",
      productID: 36,
      price: 2303,
    },

    {
      name: "Cat",
      productID: 22,
      price: 203,
    },

    {
      name: "Bull Dog",
      productID: 26,
      price: 0.31,
    },

    {
      name: "The Armsman",
      productID: 262,
      price: 0.223,
    },
  ];
  const navigate = useNavigate();
  const calculateTimeLeft = (product) => {
    const difference = new Date(product?.endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const liveAuctionPage = () => {
    navigate("/liveAuction");
  };
  const getData = async () => {
    try {
      const result = await axios.get(`${BASEURL}/api/product/getProduct`);
      if (result.status == 200) {
        setproducts(result.data.liveAuction);
        settrendingProduct(result.data.trendingAuction);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <div>
      <section className="multiArtproduct">
        <div className="multiArtproduct-banner">
          <h1> Auction Market.</h1>
        </div>
        <div className="containers">
          {/* ----------------------- Live Auction */}
          <div className="explore-live-auction">
            <div className="multiArtproduct-heading">
              <h2>Live Auctions</h2>
              <h6 onClick={liveAuctionPage} style={{ cursor: "pointer" }}>
                View All
              </h6>
            </div>
            <div className="live-auction-cards">
              <Slider {...settings}>
                {products?.map((item, index) => {
                  const timeLeft = calculateTimeLeft(item);
                  return (
                    <div className="l-auction-card" key={index}>
                      <div className="card-head">
                        <img
                          src={`${BASEURL}/${item.image}`}
                          alt=""
                          className="img-fluid"
                        />

                        <div className="auction-timer">
                          {timeLeft.days > 0 && (
                            <div className="day">
                              <h1>{formatTime(timeLeft.days)}</h1>
                              <p>d's</p>
                            </div>
                          )}
                          <div className="day">
                            <h1>{formatTime(timeLeft.hours)}</h1>
                            <p>h's</p>
                          </div>

                          <div className="day">
                            <h1>{formatTime(timeLeft.minutes)}</h1>
                            <p>mn's</p>
                          </div>

                          <div className="day">
                            <h1>{formatTime(timeLeft.seconds)}</h1>
                            <p>sec</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-details">
                        <h2>
                          {item.itemName}
                          <span>#{index + 1}</span>
                        </h2>
                        <h3>
                          {item.price}
                          <span>
                            {item.price + " "}
                            PKR
                          </span>
                        </h3>
                        <button
                          onClick={() => {
                            navigate(`/bidPage/${item._id}`);
                          }}
                        >
                          Place Bid
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>

          {/* ----------------------- Trending products*/}
          <div className="explore-live-auction">
            <div className="multiArtproduct-heading">
              <h2>Trending Auction</h2>
              <h6 onClick={liveAuctionPage} style={{ cursor: "pointer" }}>
                View All
              </h6>
            </div>
            <div className="live-auction-cards trending-products">
              <Slider {...settings}>
                {trendingProduct?.map((item, index) => {
                  return (
                    <div className="l-auction-card" key={index}>
                      <div className="card-head">
                        <img
                          src={`${BASEURL}/${item.image}`}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="card-details">
                        <h2>
                          {item.itemName}
                          <span>#{index + 1}</span>
                        </h2>
                        <h3>
                          Price
                          <span>PKR {item.price}</span>
                        </h3>
                        <button
                          onClick={() => {
                            navigate(`/bidPage/${item._id}`);
                          }}
                        >
                          Place Bid
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiProduct;
