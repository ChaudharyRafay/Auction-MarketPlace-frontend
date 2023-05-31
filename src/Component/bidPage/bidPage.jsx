import React, { useEffect, useState } from "react";
import "./bidpage.scss";
import Footer from "../home/Footer/Footer";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { BASEURL } from "../../../BASEURL";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Review from "./Review";
import ChatBox from "../Chat/chat/chatBox";

const BidPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { productId } = useParams();
  const [product, setproduct] = useState(null);
  const [bids, setbids] = useState(null);
  const [highestBid, sethighestBid] = useState(null);
  const [winner, setwinner] = useState(null);
  const [auction, setauction] = useState(null);
  const [price, setprice] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const calculateTimeLeft = () => {
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
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
  const liveAuctionCard = [
    {
      name: "The Hammer",
      productID: 16,
      price: 0.33,
    },

    {
      name: "Iron Man",
      productID: 36,
      price: 0.3,
    },

    {
      name: "Cat",
      productID: 22,
      price: 0.03,
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

  const bidPageRoute = () => {
    navigate("/bidPage");
  };
  const liveAuctionPage = () => {
    navigate("/liveAuction");
  };
  const placeBid = async () => {
    console.log(price, productId, userInfo?._id);
    if (price) {
      try {
        const result = await axios.post(`${BASEURL}/api/product/placeBid`, {
          productId,
          userId: userInfo._id,
          price,
        });
        if (result.status == 200) {
          setprice(null);
          getSpecificProduct();
          setprice(null);
          toast.success(
            "Congratulations! Your bid has been placed successfully."
          );
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
      }
    }
  };
  const getSpecificProduct = async () => {
    try {
      const result = await axios.post(
        `${BASEURL}/api/product/specificProduct`,
        {
          productId,
        }
      );
      console.log(result);
      if (result.status == 200) {
        setproduct(result.data.product);
        setauction(result.data.auction);
        if (result.data.winner) {
          setwinner(result.data.winner);
          setbids(result.data.bids);
          setauction(result.data.auction);
        } else if (result.data.bids) {
          setbids(result.data.bids);
          setauction(result.data.auction);
        }
      }
    } catch (error) {
      toast.error("Server error.Refresh the page!!");
    }
  };
  const getHighestBid = () => {
    const filteredArr = bids?.filter(
      (item) => item.price === Math.max(...bids?.map((item) => item.price))
    );
    const sortedArr = filteredArr?.sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp)
    );
    if (sortedArr) {
      sethighestBid(sortedArr[0]);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  useEffect(() => {
    getHighestBid();
  }, [bids]);

  useEffect(() => {
    getSpecificProduct();
  }, []);

  return (
    <div>
      <section className="bid-page">
        {isChatOpen && product?.userId !== userInfo?._id ? (
          <ChatBox
            setIsChatOpen={setIsChatOpen}
            isChatOpen={isChatOpen}
            recieverId={product.userId}
          />
        ) : (
          <></>
        )}
        <div className="bid-page-content container ">
          <div className="bid-top">
            <div className=" left-bid">
              <img
                src={`${BASEURL}/${product?.image}`}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className=" right-bid">
              <h6>Products</h6>
              <h1 className="product-name">{product?.itemName}</h1>

              <div className="bidding-box">
                {winner && auction == "expireWinner" ? (
                  <>
                    <div className="auction-winner">
                      <div className="Artproduct-heading">
                        <h2>Auction Winner</h2>
                      </div>

                      <div className="winner-card-grid">
                        <div className="auction-winner-card">
                          <div className="left">
                            <img
                              src={userInfo && `${BASEURL}/${userInfo?.image}`}
                              alt=""
                              style={{
                                height: "70px",
                                width: "70px",
                              }}
                            />
                            <div>
                              <h2>New Owner</h2>
                              <h3>{product?.itemName}</h3>
                            </div>
                          </div>
                          <div className="right">
                            <h3 style={{ color: "white", fontSize: "23px" }}>
                              {winner?.userId?.username}
                            </h3>
                            <h4>
                              {winner?.price}
                              <span> PKR</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {winner && auction == "expire" ? (
                      <>
                        {" "}
                        <div className="highest-bid">
                          <p>No bid found, No winner</p>
                        </div>
                        <div className="auction-end">
                          <p style={{ color: "red" }}>Auction expired </p>
                          <div className="timer">
                            <div className="days">
                              <h4 style={{ color: "red" }}>00</h4>
                              <p>days</p>
                            </div>
                            <div className="days">
                              <h4 style={{ color: "red" }}>00</h4>
                              <p>Hours</p>
                            </div>
                            <div className="days">
                              <h4 style={{ color: "red" }}>00</h4>
                              <p>Mins</p>
                            </div>
                            <div className="days">
                              <h4 style={{ color: "red" }}>00</h4>
                              <p>Secs</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="highest-bid">
                          {highestBid ? (
                            <>
                              <p>
                                Highest bid by
                                <span>
                                  {" " + highestBid?.userId?.username}
                                </span>
                              </p>
                              <h2>~ $ {highestBid?.price}</h2>
                            </>
                          ) : (
                            <>
                              <p>No bid found</p>
                            </>
                          )}
                        </div>
                        <div className="auction-end">
                          <p>Auction ends in</p>
                          <div className="timer">
                            <div className="days">
                              <h4>{timeLeft.days}</h4>
                              <p>days</p>
                            </div>
                            <div className="days">
                              <h4>{formatTime(timeLeft.hours)}</h4>
                              <p>Hours</p>
                            </div>
                            <div className="days">
                              <h4>{formatTime(timeLeft.minutes)}</h4>
                              <p>Mins</p>
                            </div>
                            <div className="days">
                              <h4>{formatTime(timeLeft.seconds)}</h4>
                              <p>Secs</p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-1 auction-end">
                          <p>Actual Price : </p>
                          <p style={{ fontWeight: "bold" }}>{product?.price}</p>
                        </div>
                        {product?.userId == userInfo?._id ? null : (
                          <div className="your-bid">
                            <h1>your bid</h1>
                            <div>
                              <input
                                value={price}
                                type="number"
                                onChange={(e) => {
                                  setprice(e.target.value);
                                }}
                              />
                              <button onClick={placeBid}>Place a Bid</button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                {product?.userId !== userInfo?._id && (
                  <button className="mt-4 chat-button" onClick={openChat}>
                    Chat
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bid-discription">
            <div className="left-bid-discript">
              <h2>discription</h2>
              <p>{product?.description}</p>
            </div>

            <div className="right-bid-discript">
              <h2>Bids</h2>
              {bids?.map((item, index) => {
                return (
                  <div className="last-bid-place" key={index}>
                    <div className="left">
                      <img
                        src={`${BASEURL}/${item?.userId?.image}`}
                        style={{ width: "42px", height: "42px" }}
                        alt=""
                        className="img-fluid"
                      />
                      <div>
                        <h4>
                          Bid placed by{" "}
                          <span>{item?.userId?.username.slice(0, 10)}...</span>
                        </h4>
                        <h5>
                          {moment(item?.timestamp).format(
                            "DD MMMM YYYY hh:mm:ss A"
                          )}
                        </h5>
                      </div>
                    </div>
                    <div className="right">
                      <h4>~ $ {item.price}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bid-bottom">
            <div className="bid-detail">
              <h2>Details</h2>
              <div className="bid-detail-content">
                {product?.property1?.length ? (
                  <>
                    {" "}
                    <div className="w-50">
                      <h4>Property1</h4>
                    </div>
                    <div className="w-50">
                      <p>{product?.property1}</p>
                    </div>
                  </>
                ) : null}
              </div>
              {product?.property2?.length ? (
                <>
                  {" "}
                  <div className="bid-detail-content">
                    <div className="w-50">
                      <h4>Property 2</h4>
                    </div>
                    <div className="w-50">
                      <p>{product?.property2}</p>
                    </div>
                  </div>
                </>
              ) : null}
              {product?.property3?.length ? (
                <>
                  {" "}
                  <div className="bid-detail-content">
                    <div className="w-50">
                      <h4>Property 3</h4>
                    </div>
                    <div className="w-50">
                      <p>{product?.property3}</p>
                    </div>
                  </div>
                </>
              ) : null}

              {/* <div className="bid-detail-content">
                <div className="w-50">
                  <h4>Manufacure </h4>
                </div>
                <div className="w-50">
                  <p>xyz</p>
                </div>
              </div> */}
            </div>
          </div>
          {/* {console.log("121")} */}

          <Review product={product} />
        </div>
      </section>
      {/* <div className="multiArtproduct">
        <div className="containers">
          <div className="explore-live-auction">
            <div className="multiArtproduct-heading">
              <h2>Live Auctions</h2>
              <h6 onClick={liveAuctionPage} style={{ cursor: "pointer" }}>
                View All
              </h6>
            </div>

            <div className="live-auction-cards">
              <Slider {...settings}>
                {liveAuctionCard.map((item) => {
                  return (
                    <div className="l-auction-card">
                      <div className="card-head">
                        <img
                          src="\productcollection\productCard.png"
                          alt=""
                          className="img-fluid"
                        />

                        <div className="auction-timer">
                          <div className="day">
                            <h1>06</h1>
                            <p>d's</p>
                          </div>

                          <div className="day">
                            <h1>16</h1>
                            <p>h's</p>
                          </div>

                          <div className="day">
                            <h1>36</h1>
                            <p>mn's</p>
                          </div>

                          <div className="day">
                            <h1>56</h1>
                            <p>sec</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-details">
                        <h2>
                          {item.name}
                          <span>#{item.productID}</span>
                        </h2>
                        <h3>
                          Price
                          <span>
                            {item.price + " "}
                            USD
                          </span>
                        </h3>
                        <button onClick={bidPageRoute}>Place Bid</button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BidPage;
