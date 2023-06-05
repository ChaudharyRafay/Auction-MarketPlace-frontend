import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./payinfo.scss";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
const PaymentInfo = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const { productId } = useParams();
  const [product, setproduct] = useState([]);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    expireDate: "",
    CVC: "",
    cardNumber: "",
    paymentMethod: "",
    productId: productId,
    userId: userData._id,
  });
  console.log(formData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remove error for the field if it has a value
    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const fieldErrors = {};
    let hasErrors = false;

    for (const key in formData) {
      if (!formData[key]) {
        fieldErrors[key] = true;
        hasErrors = true;
      }
    }
    // Check for paymentMethod radio button
    if (!formData.paymentMethod) {
      fieldErrors.paymentMethod = true;
      hasErrors = true;
    }
    setErrors(fieldErrors);

    // If any field is empty, return without submitting the form
    if (hasErrors) {
      return;
    }
    try {
      const result = await axios.post(
        `${BASEURL}/api/payment/createpayment`,
        formData
      );
      if (result.status == 200) {
        toast.success(
          "Thank you for your purchase! We value your feedback. Please take a moment to give us a review."
        );
        navigate(`/bidPage/${productId}`);
      }
    } catch (error) {
      toast.error("Server error! Try again");
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        setisloading(true);

        const response = await axios.post(
          `${BASEURL}/api/payment/authenticateUser`,
          {
            userId: userData._id,
            productId,
          }
        );
        if (response.status == 200) {
          setisloading(false);
          setproduct(response.data.product);
        }
      } catch (error) {
        setisloading(false);
        navigate("/404 Not found");
        console.log(error);
      }
    };

    authenticateUser();
  }, []);
  return (
    <div>
      {isloading && (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="grow"
            className="me-1"
            style={{ fontSize: "15rem" }}
          />
          <Spinner
            animation="grow"
            className="me-1"
            style={{ fontSize: "15rem" }}
          />
          <Spinner animation="grow" style={{ fontSize: "15rem" }} />
        </div>
      )}

      <section className="payment-info">
        <div className="go-back">
          <Link to="/ownerShip">
            <Icon
              icon="material-symbols:arrow-back-rounded"
              color="black"
              width="20"
              height="24"
              className="me-2"
            />
            Back
          </Link>
        </div>
        <div className="investor-sale-property-content">
          <div className="left-content">
            <form onSubmit={handleSubmit}>
              <div className="publish-form">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <p className="text-danger mt-1">
                      * First name is a required field
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <p className="text-danger mt-1">
                      * Last name is a required field
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                  />
                  {errors.Email && (
                    <p className="text-danger mt-1">
                      * Email is a required field
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="expireDate"
                    placeholder="Expire Date"
                    value={formData.expireDate}
                    onChange={handleInputChange}
                  />
                  {errors.expireDate && (
                    <p className="text-danger mt-1">
                      * Expire date is a required field
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="CVC"
                    placeholder="CVV"
                    value={formData.CVC}
                    onChange={handleInputChange}
                  />
                  {errors.CVC && (
                    <p className="text-danger mt-1">
                      * CVV is a required field
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  {errors.cardNumber && (
                    <p className="text-danger mt-1">
                      * Card number is a required field
                    </p>
                  )}
                </div>
              </div>

              <div className="payment-method">
                <div className="sect-head">
                  <h1>Payment Method</h1>
                </div>

                <div className="select-payment-method">
                  <div className="b1">
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={formData.paymentMethod === "stripe"}
                        onChange={handleInputChange}
                      />
                      <img src="\asset\images\stripe.svg" alt="" />
                    </label>
                  </div>
                  <div className="b1">
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mollie"
                        checked={formData.paymentMethod === "mollie"}
                        onChange={handleInputChange}
                      />
                      <img src="\asset\images\mollie.svg" alt="" />
                    </label>
                  </div>
                </div>
                {errors.paymentMethod && (
                  <p className="text-danger mt-1">
                    * Payment method is a required field
                  </p>
                )}

                <div className="publish-btn">
                  <button type="submit">Process payment</button>
                </div>
              </div>
            </form>
          </div>

          <div className="right-content">
            <div>
              <div className="right-pro">
                <div className="property-img">
                  <h3>Your Product</h3>
                  <img
                    src={product ? `${BASEURL}/${product?.image}` : null}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="bonds-val">
                  <h1>Payables</h1>
                  <span>=</span>
                  <h2>{product?.price}</h2>
                </div>
                <div className="total ">
                  <p>Total</p>
                  <h4>
                    <span>PKR</span>
                    {product?.price}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentInfo;
