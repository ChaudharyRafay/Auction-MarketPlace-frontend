import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { BASEURL } from "../../../BASEURL";
import { Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./logins.scss";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../reducers/authreducer";
const PhoneLogin = () => {
  const [key, setKey] = useState("mail");
  const [showMailPopup, setshowMailPopup] = useState(false);
  const [error, seterror] = useState(null);
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [countryCode, setcountryCode] = useState(null);
  const [verifyCode, setverifyCode] = useState(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [userId, setuserId] = useState();
  const [password, setpassword] = useState("");
  const handleClose = () => setshowMailPopup(false);
  const handleShow = () => setshowMailPopup(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (email || (phone && password)) {
      try {
        const result = await axios.post(`${BASEURL}/api/user/loginUser`, {
          phone: countryCode + phone,
          email,
          password,
        });
        if (result.status == 200) {
          const userData = result.data.user;
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch(setUserInfo(userData));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          return seterror("*Invalid Credentials");
        } else if (error.response.status == 400) {
          setuserId(error.response.data.userId);
          setverifyCode(error.response.data.code);
          handleShow();
        }
      }
    }
  };
  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };
  const handleVerifyCode = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 6 && enteredCode == verifyCode) {
      const result = await axios.post(`${BASEURL}/api/user/verifyAccount`, {
        userId,
      });
      if (result.status == 200) {
        const userData = result.data.user;
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(setUserInfo(userData));
        navigate("/");
      }
      // call your function here
    } else {
      console.log("not match");
    }
  };
  useEffect(() => {
    handleVerifyCode();
  }, [code, verifyCode]);
  return (
    <div>
      <section className="phone-logins">
        <div className="left-phone-logins">
          <Link to="/">
            <img
              src="\asset\hero\logo.png"
              alt=""
              className="img-fluid nav-logo"
            />
          </Link>
          {/* <Toast /> */}
          <h1>Join Our Community</h1>
          <div className="social-icons">
            <a href="" target="v">
              <Icon icon="mdi:twitter" color="black" width="40" height="40" />
            </a>
            <a href="" target="v">
              <Icon
                icon="ic:baseline-discord"
                color="black"
                width="40"
                height="40"
              />
            </a>
            <a href="" target="v">
              <Icon
                icon="ic:baseline-telegram"
                color="black"
                width="40"
                height="40"
              />
            </a>
            <a href="" target="v">
              <Icon
                icon="ri:medium-fill"
                color="black"
                width="40"
                height="40"
              />
            </a>
          </div>
        </div>
        <div className="right-phone-logins">
          <div className="right-wlogin">
            <h2>log In & Sign up</h2>
            <p>Exploring your Favourite Product journey with Auction Market.</p>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => {
                setKey(k);
              }}
              className="mb-3"
            >
              <Tab
                eventKey="mail"
                title={
                  <span>
                    <img src="\logins\mail.svg" alt="My Image" />
                    Email
                  </span>
                }
              >
                <div className="login-input">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    name=""
                    id=""
                    value={password}
                    placeholder="password"
                    className="mt-4"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  {error && (
                    <p
                      className="danger"
                      style={{
                        color: "red",
                        textAlign: "left",
                        marginTop: "4px",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <div>
                    <button className="conti" onClick={handleLogin}>
                      LOGIN
                    </button>
                  </div>
                  <div className="privacy-check">
                    <span>
                      <h6>
                        <input type="checkbox" name="" id="" />I have read and
                        agree to Auction Market
                        <a href="#" target="j">
                          Terms of Service
                        </a>
                        and
                        <a href="#" target="1">
                          Privacy Policy
                        </a>
                      </h6>
                    </span>
                    <span>
                      <Link to="/register">Register</Link>
                    </span>
                  </div>
                </div>
              </Tab>

              <Tab
                eventKey="phone"
                title={
                  <span>
                    <img src="\logins\phone.svg" alt="phone" />
                    phone
                  </span>
                }
              >
                <div className="login-input">
                  <div className="d-flex justify-content-between">
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="92"
                      className="codePhone"
                      onChange={(e) => {
                        setcountryCode(e.target.value);
                      }}
                    />
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="000 0000 000"
                      className="phone-numb"
                      onChange={(e) => {
                        setphone(e.target.value);
                      }}
                    />
                  </div>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                    className="mt-4"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  {error && (
                    <p
                      className="danger"
                      style={{
                        color: "red",
                        textAlign: "left",
                        marginTop: "4px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <div>
                    <button className="conti" onClick={handleLogin}>
                      LOGIN
                    </button>
                  </div>
                  <div className="privacy-check">
                    <span>
                      <h6>
                        <input type="checkbox" name="" id="" />I have read and
                        agree to Auction Market
                        <a href="#" target="j">
                          Terms of Service
                        </a>
                        and
                        <a href="#" target="1">
                          Privacy Policy
                        </a>
                      </h6>
                    </span>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <Modal show={showMailPopup} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="mail-login-modal">
            <p className="login-modal-head">
              {phone ? (
                <> Enter the 6-digit code we sent via SMS to</>
              ) : (
                <> Enter the 6-digit code we emailed to</>
              )}
            </p>
            <h6>{phone ? phone : email}</h6>
            <div className="mail-otp">
              <Icon
                icon="material-symbols:mail-rounded"
                color="black"
                width="48"
                height="48"
              />
              <span>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 0)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 1)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 2)}
                />

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 3)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 4)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="0"
                  maxLength="1"
                  onInput={(e) => {
                    if (e.target.value.length === e.target.maxLength)
                      e.target.nextElementSibling?.focus();
                  }}
                  onChange={(e) => handleInputChange(e, 5)}
                />
              </span>
            </div>
            <h5>
              Your code will arrive in a few seconds.
              <br />
              <span>Resend Code</span>
            </h5>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default PhoneLogin;
