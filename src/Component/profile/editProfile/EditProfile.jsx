import React, { useEffect, useState, PureComponent, useRef } from "react";
import "./editprofile.scss";

import { Icon } from "@iconify/react";
import { Tab, Tabs } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { BASEURL } from "../../../../BASEURL";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../../reducers/profileReducer";
// import UserProduct from "./userProduct";
import Products from "./Products";
import PhoneEmail from "./PhoneEmail";
import Setting from "./Setting";
import AllBids from "./AllBids";
import Activities from "./Activities";
const EditProfile = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [coverPhoto, setcoverPhoto] = useState(null);
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [key, setKey] = useState("mail");
  const [key1, setKey1] = useState("eth");
  const [sellkey, setSellKey] = useState("sell");
  const [fileUrl, setfileUrl] = useState(null);
  const [profileUrl, setprofileUrl] = useState(null);
  // const [showWalletPopup, setshowWalletPopup] = useState(false);

  // const handleClose2 = () => setshowWalletPopup(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setcoverPhoto(file);
    setfileUrl(URL.createObjectURL(file));
  };
  const handleCoverPhoto = async () => {
    try {
      formData.append("userId", userInfo._id);
      console.log(userInfo);
      formData.append("coverImage", coverPhoto);
      if (fileUrl) {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        const result = await axios.post(
          `${BASEURL}/api/user/updateCoverImage`,
          formData
        );
        if (result.status == 200) {
          const Data = result.data.updatedProfile;
          dispatch(profileData(Data));
          toast.success("Cover image updated successfully!!");
          setfileUrl(null);
        }
      }
    } catch (error) {
      console.log(error.stack);
      toast.error("Server error!!");
    }
  };
  const handleProfileImageSelect = async (e) => {
    const file = e.target.files[0];
    setprofilePhoto(file);
    setprofileUrl(URL.createObjectURL(file));
  };
  const updateProfileImage = async () => {
    try {
      if (profileUrl) {
        formData.append("userId", userInfo._id);
        formData.append("profileImage", profilePhoto);

        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        const result = await axios.post(
          `${BASEURL}/api/user/updateProfileImage`,
          formData
        );
        const Data = result.data.updatedProfile;
        dispatch(profileData(Data));
        toast.success("Profile image updated successfully!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!!");
    }
  };
  useEffect(() => {
    updateProfileImage();
  }, [profileUrl]);

  return (
    <div>
      <section className="edit-profile">
        <div className="profile-banner">
          {fileUrl ? (
            <img src={fileUrl} alt="" />
          ) : userInfo?.coverPhoto ? (
            <img src={`${BASEURL}/${userInfo?.coverPhoto}`} alt="" />
          ) : (
            <>
              <h1>upload image</h1>
              <img src="\profile\editBanner.png" alt="" />
            </>
          )}

          <button onClick={handleButtonClick} style={{ width: "60px" }}>
            <Icon
              icon="ic:outline-photo-camera"
              color="#444"
              width="30"
              height="30"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </button>
          {fileUrl && <button onClick={handleCoverPhoto}>Save Photo</button>}
        </div>

        <div className="profile-header">
          <div className="left">
            <div className="user-dp">
              {/* onUploading dp following img will be shown */}
              {profileUrl ? (
                <img
                  src={profileUrl}
                  alt=""
                  className="profile-dp"
                  style={{ zIndex: 2 }}
                />
              ) : userInfo?.image ? (
                <>
                  <img
                    src={`${BASEURL}/${userInfo?.image}`}
                    alt=""
                    className="profile-dp"
                    style={{ zIndex: 2 }}
                  />
                  <label htmlFor="dp" style={{ zIndex: 3 }}></label>
                  <input
                    type="file"
                    id="dp"
                    accept=".jpg,,jpeg,png,.gif"
                    onChange={handleProfileImageSelect}
                  />
                </>
              ) : (
                <>
                  <Icon
                    icon="mdi:cloud-upload-outline"
                    color="#979797"
                    width="32"
                    height="32"
                  />
                  <h6>
                    Drop file to upload
                    <br />
                    Or <span>browse</span>
                  </h6>
                  <p>
                    Supported file formated: .jepg, .png, and .gif <br /> Max
                    File size is 10 MB
                  </p>
                  <label htmlFor="dp" style={{ zIndex: 3 }}></label>
                  <input
                    type="file"
                    id="dp"
                    accept=".jpg,,jpeg,png,.gif"
                    onChange={handleProfileImageSelect}
                  />
                </>
              )}
            </div>
            <div className="res-profile">
              <div className="user-details">
                <div className="user-name">
                  <h6>{userInfo?.username}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {userInfo?.bioDetail ? (
              <>
                <h3>Bio Data</h3>
                <p> {userInfo?.bioDetail}</p>
              </>
            ) : null}

            <div className="social-ico" style={{ marginTop: "12px" }}>
              <a href={userInfo?.twitter ? userInfo.twitter : "#"} target="1">
                <Icon
                  icon="ant-design:twitter-circle-filled"
                  color="#000"
                  width="32"
                  height="32"
                  className="ico"
                />
              </a>
              <a href={userInfo?.facebook ? userInfo.facebook : "#"} target="1">
                <Icon
                  icon="ic:baseline-facebook"
                  color="#000"
                  width="32"
                  height="32"
                  className="ico"
                />
              </a>
              <a href={userInfo?.discord ? userInfo.discord : "#"} target="1">
                <Icon
                  icon="ic:baseline-telegram"
                  color="#000"
                  width="32"
                  height="32"
                  className="ico"
                />
              </a>
              <a href="#" target="">
                <Icon
                  icon="majesticons:link-circle"
                  color="#000"
                  width="32"
                  height="32"
                  className="ico"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="profile-form ">
          <div class="d-flex align-items-start sideTab">
            <div
              className="nav flex-column nav-pills me-3 profileTab-btn"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Profile
              </button>
              <button
                class="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#accountTab"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                Account
              </button>
              <button
                class="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#settingTab"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                setting
              </button>
              <button
                class="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#sellproducttab"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Your Bids
              </button>
            </div>

            <div class="tab-content " id="v-pills-tabContent">
              {/* Profile */}

              <div
                class="tab-pane fade show active "
                id="profile"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="profile-data ">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 "
                  >
                    {/* My Items */}
                    <Tab eventKey="mail" title={<span>My Items </span>}>
                      {/* items if empty */}
                      <Products />
                    </Tab>

                    {/* Offers */}
                    {/* <Tab eventKey="offer" title={<span>Offer</span>}> */}
                    {/* Total offers */}

                    {/* offer-details */}
                    {/* <div className="fav-offers-details">
                        <div className="fav-profile-card left">
                          <div className="fav-card  ">
                            <div className="fav-card-head">
                              <img src="\profile\favCard.png" alt="" />
                            </div>

                            <div className="fav-name">
                              <h1>The start</h1>
                              <div className="offeror">
                                <span>6+</span>
                                <div className="offeror-im">
                                  <img src="\profile\offer.png" alt="" />
                                  <img src="\profile\offer.png" alt="" />
                                  <img src="\profile\offer.png" alt="" />
                                  <img src="\profile\offer.png" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button>Accept Highest Offer</button>
                        </div>

                        <div className="right">
                          <h3>Abstrct Cat</h3>
                          <p>
                            Create by <img src="\profile\offer.png" alt="" />
                            Julia Sean
                          </p>
                          <h2>Bids</h2>

                          <div className="all-offers">
                            <div className="offerr">
                              <img src="\profile\offer.png" alt="" />
                              <div>
                                <p>
                                  2000 PKR by <span>Allen</span>
                                </p>
                                <h6>
                                  1 hr ago
                                  <span>Accept</span>
                                </h6>
                              </div>
                            </div>

                            <div className="offerr">
                              <img src="\profile\offer.png" alt="" />
                              <div>
                                <p>
                                  2000 PKR by <span>Allen</span>
                                </p>
                                <h6>
                                  1 hr ago
                                  <span>Accept</span>
                                </h6>
                              </div>
                            </div>

                            <div className="offerr">
                              <img src="\profile\offer.png" alt="" />
                              <div>
                                <p>
                                  2000 PKR by <span>Allen</span>
                                </p>
                                <h6>
                                  1 hr ago
                                  <span>Accept</span>
                                </h6>
                              </div>
                            </div>

                            <div className="offerr">
                              <img src="\profile\offer.png" alt="" />
                              <div>
                                <p>
                                  2000 PKR by <span>Allen</span>
                                </p>
                                <h6>
                                  1 hr ago
                                  <span>Accept</span>
                                </h6>
                              </div>
                            </div>

                            <div className="offerr">
                              <img src="\profile\offer.png" alt="" />
                              <div>
                                <p>
                                  2000 PKR by <span>Allen</span>
                                </p>
                                <h6>
                                  1 hr ago
                                  <span>Accept</span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    {/* </Tab> */}

                    {/* Activites */}
                    <Tab eventKey="Activities" title={<span>Activities</span>}>
                      <Activities />
                    </Tab>
                  </Tabs>
                </div>
              </div>

              {/* Account */}

              <div
                class="tab-pane fade"
                id="accountTab"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <div className="account-tab-content">
                  {/* if wallet is connected */}

                  {/* mail number */}
                  <PhoneEmail />
                </div>

                {/* <Modal show={showWalletPopup} onHide={handleClose2} centered>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="wallet-login-modal">
                    <div className="right-wlogin">
                      <h2>Connect a Wallet to continue</h2>
                      <p>Connect your wallet to log in or create an account</p>
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key1}
                        onSelect={(k) => setKey1(k)}
                        className="mb-3"
                      >
                        <Tab
                          eventKey="eth"
                          title={
                            <span>
                              <img src="\logins\ether.svg" alt="My Image" />
                              Ethereum
                            </span>
                          }
                        >
                          <div className="wallet-connect">
                            <img src="\logins\meta.svg" alt="" />
                            <p>MetaMask</p>
                          </div>

                          <div className="wallet-connect">
                            <img src="\logins\connectWallet.svg" alt="" />
                            <p>Wallet Connect</p>
                          </div>

                          <div className="wallet-connect">
                            <img src="\logins\coinbase.png" alt="" />
                            <p>Coin Base</p>
                          </div>

                          <div className="wallet-connect">
                            <img src="\logins\crypto.svg" alt="" />
                            <p>Crypto</p>
                          </div>
                        </Tab>

                        <Tab
                          eventKey="binance"
                          title={
                            <span>
                              <img src="\logins\binance.svg" alt="binance" />
                              binance chain
                            </span>
                          }
                          disabled
                        ></Tab>

                        <Tab
                          eventKey="Polygon"
                          title={
                            <span>
                              <img src="\logins\poly.svg" alt="Polygon" />
                              Polygon
                            </span>
                          }
                          disabled
                        ></Tab>

                        <Tab
                          eventKey="apt"
                          title={
                            <span>
                              <img src="\logins\apt.svg" alt="apt" />
                              Aptos
                            </span>
                          }
                          disabled
                        ></Tab>
                        <Tab
                          eventKey="Sui"
                          title={
                            <span>
                              <img src="\logins\sui.svg" alt="Sui" />
                              Sui
                            </span>
                          }
                          disabled
                        ></Tab>
                      </Tabs>
                      <h6>New to product? Learn more about wallets</h6>
                      <h6>
                        By clicking contine you indicate that you have read and
                        agree to our
                        <a href="#" target="j">
                          Terms of Service
                        </a>
                        and
                        <a href="#" target="1">
                          Privacy Policy
                        </a>
                      </h6>
                    </div>
                  </Modal.Body>
                </Modal> */}
              </div>

              {/* Setting */}

              <div
                class="tab-pane fade"
                id="settingTab"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <Setting />
              </div>

              {/* Sell product */}

              <div
                class="tab-pane fade"
                id="sellproducttab"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                <div className="sellproduct-profile">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={sellkey}
                    onSelect={(k) => setSellKey(k)}
                    className="mb-3 "
                  >
                    {/* product List */}
                    <Tab eventKey="sell" title={<span> Bids</span>}>
                      <AllBids />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
