import React, { useState } from "react";

import "./createProduct.scss";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    itemName: "",
    description: "",
    property1: "",
    property2: "",
    property3: "",
    startDate: "",
    endDate: "",
    price: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const formData = new FormData();
  const handleSubmit = async () => {
    // Validate the form fields;
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }
    formData.append("itemName", data.itemName);
    formData.append("description", data.description);
    formData.append("property1", data.property1);
    formData.append("property2", data.property2);
    formData.append("property3", data.property3);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("price", data.price);
    formData.append("image", data.image);
    formData.append("userId", userInfo._id);
    try {
      const result = await axios.post(
        `${BASEURL}/api/product/createProduct`,
        formData
      );
      if (result.status == 200) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Product not created!!");
      console.log(error.stack);
    }
  };
  const validateForm = () => {
    let isValid = true;
    const errorsCopy = {};

    if (data.itemName.trim() === "") {
      errorsCopy.itemName = "*Item name is required field";
      isValid = false;
    }

    if (data.description.trim() === "") {
      errorsCopy.description = "*Description is required field";
      isValid = false;
    }
    if (data.property1.trim() === "") {
      errorsCopy.property1 = "*Property1 is required field";
      isValid = false;
    }
    if (data.property2.trim() === "") {
      errorsCopy.property2 = "*Property2 is required field";
      isValid = false;
    }
    if (data.property3.trim() === "") {
      errorsCopy.property3 = "Property3 is required field";
      isValid = false;
    }
    if (data.startDate.trim() === "") {
      errorsCopy.startDate = "*Start Date is required field";
      isValid = false;
    }
    if (data.endDate.trim() === "") {
      errorsCopy.endDate = "*End Date is required field";
      isValid = false;
    }
    if (data.price.trim() === "") {
      errorsCopy.price = "*Price is required field";
      isValid = false;
    }
    if (data.image === null) {
      errorsCopy.image = "*Image is required field";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleStartDateChange = (e) => {
    const selectedDate = moment(e.target.value, "YYYY-MM-DD");
    const currentDate = moment().startOf("day");

    if (selectedDate.isSameOrBefore(currentDate)) {
      setErrors((prevState) => ({
        ...prevState,
        startDate: "*Please select a date today or in the future.",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, startDate: "" }));
      setdata((prevState) => ({
        ...prevState,
        startDate: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      }));
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = moment(e.target.value, "YYYY-MM-DD");
    const currentDate = moment().startOf("day");

    if (selectedDate.isSameOrBefore(currentDate)) {
      setErrors((prevState) => ({
        ...prevState,
        endDate: "*Please select a date today or in the future.",
      }));
    } else if (selectedDate.isBefore(data.startDate)) {
      setErrors((prevState) => ({
        ...prevState,
        endDate: "*End date must be after the start date.",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, endDate: "" }));
      setdata((prevState) => ({
        ...prevState,
        endDate: selectedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      }));
    }
  };
  return (
    <div>
      <section className="create-product ">
        <div className="multiArtproduct-banner">
          <h1>New Product</h1>
          <div className="multiart-btns">
            <button>Create product</button>
            <button>Mint product</button>
          </div>
          <div className="shade"></div>
        </div>

        <div className="container">
          <div className="create-product-content">
            <div className="left">
              <h5>upload file</h5>
              <h6>Drag or Choose your file to upload</h6>
              {!selectedImage ? (
                <>
                  <div className="upload-file">
                    <p>
                      PNG, GIF, WEBP, MP4 or MP3 . <br /> Max 100mb
                    </p>
                    <div className="uploader">
                      <label htmlFor="file">Upload File</label>
                      <input
                        type="file"
                        name=""
                        id="file"
                        required
                        onChange={(e) => {
                          setdata((prevState) => ({
                            ...prevState,
                            image: e.target.files[0],
                          }));
                          setSelectedImage(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </div>
                  </div>
                  {!selectedImage && errors.image && (
                    <span className="error text-danger">{errors.image}</span>
                  )}
                </>
              ) : (
                <div>
                  <div
                    class="mb-4  d-flex flex-column justify-content-center"
                    // style={{ border: "3px dashed #000000" }}
                  >
                    <img
                      src={selectedImage}
                      alt="example placeholder"
                      style={{ width: "300px" }}
                    />
                  </div>

                  <div class="d-flex justify-content-center">
                    <div class="btn  btn-rounded">
                      <label
                        class="form-label text-white m-1"
                        for="customFile1"
                        style={{
                          fontFamily: "Trap600",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "12px",
                          lineHeight: "48px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "#ffffff",
                          background: "linear-gradient(0deg, #000000, #000000)",
                          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.1)",
                          borderRadius: " 10px",
                          width: "160px",
                          cursor: "pointer",
                        }}
                      >
                        Choose file
                      </label>

                      <input
                        type="file"
                        class="form-control d-none"
                        name=""
                        id="customFile1"
                        required
                        onChange={(e) => {
                          setdata((prevState) => ({
                            ...prevState,
                            image: e.target.files[0],
                          }));
                          setSelectedImage(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="right">
              <div className="product-data">
                <div className="product-entries">
                  <p>item name</p>
                  <input
                    type="text"
                    required
                    onChange={(e) => {
                      setdata((prevState) => ({
                        ...prevState,
                        itemName: e.target.value,
                      }));
                      e.target.value !== 0 ? (errors.itemName = "") : null;
                    }}
                  />
                  {errors.itemName && (
                    <span className="error text-danger">{errors.itemName}</span>
                  )}

                  <p className="mt-3">Description</p>
                  <textarea
                    name=""
                    id=""
                    required
                    className="text-area"
                    onChange={(e) => {
                      setdata((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }));
                      e.target.value !== 0 ? (errors.description = "") : null;
                    }}
                  />
                  {errors.description && (
                    <span className="error text-danger">
                      {errors.description}
                    </span>
                  )}
                </div>
                <div className="row mt-3 product-entries custom-select">
                  <div className="col-md-4 col-12">
                    <p>Property 1</p>
                    <input
                      type="text"
                      placeholder="Properties"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          property1: e.target.value,
                        }));
                        e.target.value !== 0 ? (errors.property1 = "") : null;
                      }}
                    />
                    {errors.property1 && (
                      <span className="error text-danger">
                        {errors.property1}
                      </span>
                    )}
                  </div>
                  <div className="col-md-4 col-12">
                    <p>Property 2</p>
                    <input
                      type="text"
                      placeholder="properties"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          property2: e.target.value,
                        }));
                        e.target.value !== 0 ? (errors.property2 = "") : null;
                      }}
                    />
                    {errors.property2 && (
                      <span className="error text-danger">
                        {errors.property2}
                      </span>
                    )}
                  </div>
                  <div className="col-md-4 col-12">
                    <p>Property 3 </p>
                    <input
                      type="text"
                      placeholder="some text"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          property3: e.target.value,
                        }));
                        e.target.value !== 0 ? (errors.property3 = "") : null;
                      }}
                    />
                    {errors.property3 && (
                      <span className="error text-danger">
                        {errors.property3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mt-3 product-entries custom-select">
                  <div className="col-md-4 col-12">
                    <p>Start Date</p>
                    <input
                      type="date"
                      required
                      placeholder="Fixed Price"
                      onChange={handleStartDateChange}
                      // onChange={(e) => {
                      //   setdata((prevState) => ({
                      //     ...prevState,
                      //     startDate: moment
                      //       .utc(e.target.value)
                      //       .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                      //   }));
                      //   e.target.value !== 0 ? (errors.startDate = "") : null;
                      // }}
                    />
                    {errors.startDate && (
                      <span className="error text-danger">
                        {errors.startDate}
                      </span>
                    )}
                  </div>
                  <div className="col-md-4 col-12">
                    <p>End Date</p>
                    <input
                      type="date"
                      required
                      placeholder="Fixed Price"
                      // onChange={(e) => {
                      //   setdata((prevState) => ({
                      //     ...prevState,
                      //     endDate: moment
                      //       .utc(e.target.value)
                      //       .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                      //   }));
                      //   e.target.value !== 0 ? (errors.endDate = "") : null;
                      // }}

                      onChange={handleEndDateChange}
                    />
                    {errors.endDate && (
                      <span className="error text-danger">
                        {errors.endDate}
                      </span>
                    )}
                  </div>
                  <div className="col-md-4 col-12">
                    <p>Price</p>
                    <input
                      type="number"
                      required
                      placeholder="Starting Price"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          price: e.target.value,
                        }));
                        e.target.value !== 0 ? (errors.price = "") : null;
                      }}
                    />
                    {errors.price && (
                      <span className="error text-danger">{errors.price}</span>
                    )}
                  </div>
                </div>
                <button onClick={handleSubmit}>create Product</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProduct;
