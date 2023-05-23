import React, { useEffect, useState } from "react";
import "./editprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Icon } from "@iconify/react";
import axios from "axios";
import { BASEURL } from "../../../../BASEURL";
import { setUserInfo } from "../../../reducers/authreducer";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
function PhoneEmail() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPhonePopup, setshowPhonePopup] = useState(false);
  const [phoneNo, setphoneNo] = useState(null);
  const [email, setemail] = useState(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verifyCode, setverifyCode] = useState(null);
  const [isloading, setisloading] = useState(false);
  console.log(verifyCode);
  const handleClose1 = () => setshowPhonePopup(false);
  const handleShow1 = async (type) => {
    if (type == "email") {
      const code = Math.floor(Math.random() * 900000) + 100000;
      setverifyCode(code);
      const result = await axios.post(`${BASEURL}/api/user/sendEmail`, {
        email,
        username: userInfo.username,
        code,
      });
      if (result.status == 200) {
        setshowPhonePopup(true);
      }
    } else if (type == "phone") {
      const code = Math.floor(Math.random() * 900000) + 100000;
      setverifyCode(code);
      const result = await axios.post(`${BASEURL}/api/user/sendCodePhone`, {
        phoneNo,
        code,
      });
      if (result.status == 200) {
        setshowPhonePopup(true);
      }
      // console.log(code);
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
      setisloading(true);
      if (phoneNo) {
        try {
          const result = await axios.post(`${BASEURL}/api/user/updatePhoneNo`, {
            userId: userInfo._id,
            phoneNo,
          });
          if (result.status == 200) {
            dispatch(setUserInfo(result.data.updated));
            setisloading(false);
            setshowPhonePopup(false);
            toast.success(`Phone number updated successfully..`);
          }
        } catch (error) {
          setisloading(false);
          toast.error("Server error.Try again!!");
        }
      } else {
        try {
          const result = await axios.post(`${BASEURL}/api/user/updateEmail`, {
            userId: userInfo._id,
            email,
          });
          if (result.status == 200) {
            dispatch(setUserInfo(result.data.updated));
            setisloading(false);
            setshowPhonePopup(false);
            toast.success(`Email updated successfully..`);
          }
        } catch (error) {
          setisloading(false);
          toast.error("Server error.Try again!!");
        }
      }
      // call your function here
    } else {
      console.log("not match");
    }
  };
  useEffect(() => {
    handleVerifyCode();
  }, [code, verifyCode]);
  useEffect(() => {
    if (userInfo?.phone) {
      setphoneNo(userInfo.phone);
    } else if (userInfo?.email) {
      setemail(userInfo.email);
    }
  }, [userInfo]);

  return (
    <div>
      <div className="account-tab-content">
        {email && (
          <div className="account-inpt">
            <p>Email</p>
            <div>
              <input
                type="email"
                name=""
                id=""
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="mail@gmail.com"
              />
              <button onClick={() => handleShow1("email")}>change</button>
            </div>
          </div>
        )}

        {phoneNo && (
          <div className="account-inpt">
            <p>Phone Number</p>
            <div>
              <input
                type="number"
                name=""
                value={phoneNo}
                onChange={(e) => {
                  setphoneNo(e.target.value);
                }}
                id=""
                placeholder="1237**********4546"
                // className="p-numb"
              />
              <button onClick={() => handleShow1("phone")}>change</button>
            </div>
          </div>
        )}
      </div>
      <Modal show={showPhonePopup} onHide={handleClose1} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="mail-login-modal">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {isloading ? (
              <>
                <Spinner className="me-1" animation="grow" />
                <Spinner className="me-1" animation="grow" />
                <Spinner animation="grow" />
              </>
            ) : (
              <div>
                <p className="login-modal-head">
                  {phoneNo ? (
                    <> Enter the 6-digit code we sent via SMS to</>
                  ) : (
                    <> Enter the 6-digit code that we emailed to</>
                  )}
                </p>
                <h6>{phoneNo ? phoneNo : email}</h6>
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
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PhoneEmail;
