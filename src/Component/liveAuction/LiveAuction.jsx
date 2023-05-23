import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./liveAuction.scss";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
const LiveAuction = () => {
  const [liveAuctionCard, setliveAuctionCard] = useState([]);
  const [endedAuction, setendedAuction] = useState([]);
  const navigate = useNavigate();

  const bidPage = () => {
    navigate("/bidPage");
  };
  const getLiveAuction = async () => {
    try {
      const result = await axios.get(`${BASEURL}/api/product/getProduct`);
      if (result.status == 200) {
        setliveAuctionCard(result.data.liveAuction);
        setendedAuction(result.data.endAuction);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };
  useEffect(() => {
    getLiveAuction();
  }, []);
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <div>
      <section className="live-auction">
        <div className="multiArtproduct-banner">
          <h1>
            <span>Live </span>
            Auctions
          </h1>
          <p>Your Bid Your Choice Place A Bid On Live Auctions</p>
        </div>
        {/* <div className="backTab">
          <a href="#">Back</a>
          <p>Product / Live Auction</p>
        </div> */}
        <div className="containers">
          <div className="live-auctions">
            <div className="Artproduct-heading">
              <h2>Live Auctions</h2>
            </div>

            <div className="live-auction-cards">
              {liveAuctionCard?.map((item, index) => {
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
                        {item?.itemName}
                        <span>#{index + 1}</span>
                      </h2>
                      <h3>
                        Details
                        <span>
                          {item?.price}
                          <span> </span>
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
            </div>
          </div>

          <div className="live-auctions ">
            <div className="Artproduct-heading">
              <h2>Auctions Ended</h2>
            </div>

            <div className="live-auction-cards auction-ended">
              {endedAuction?.map((item, index) => {
                return (
                  <>
                    <div className="l-auction-card">
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
                          Details
                          <span>
                            {item.price + " "}
                            PKR
                          </span>
                        </h3>
                        <button>Ended</button>
                        <Link to={`/bidPage/${item._id}`}>
                          {" "}
                          <button
                            className="button1"
                            style={{ marginTop: "16px" }}
                          >
                            View Winner
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          {/* <div className="auction-winner">
            <div className="Artproduct-heading">
              <h2>Auctions Winner</h2>
            </div>

            <div className="winner-card-grid">
              <div className="auction-winner-card">
                <div className="left">
                  <img src="\mint\mintUser2.png" alt="" />
                  <div>
                    <h2>New Owner</h2>
                    <h3>The Hammer</h3>
                  </div>
                </div>
                <div className="right">
                  <h4>jack</h4>
                  <h4>
                    300.0<span> PKR</span>
                  </h4>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default LiveAuction;
