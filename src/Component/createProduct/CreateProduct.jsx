import React, { useState } from "react";

import "./createProduct.scss";
import axios from "axios";
import { BASEURL } from "../../../BASEURL";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreateProduct = () => {
  const { userInfo } = useSelector((state) => state.user);
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
  const formData = new FormData();
  const handleSubmit = async () => {
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
      console.log(error.stack);
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
                    }}
                  />
                </div>
              </div>
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
                    }}
                  />

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
                    }}
                  />
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
                      }}
                    />
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
                      }}
                    />
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
                      }}
                    />
                  </div>
                </div>

                <div className="row mt-3 product-entries custom-select">
                  <div className="col-md-4 col-12">
                    <p>Start Date</p>
                    <input
                      type="date"
                      required
                      placeholder="Fixed Price"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          startDate: moment
                            .utc(e.target.value)
                            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                        }));
                      }}
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <p>End Date</p>
                    <input
                      type="date"
                      required
                      placeholder="Fixed Price"
                      onChange={(e) => {
                        setdata((prevState) => ({
                          ...prevState,
                          endDate: moment
                            .utc(e.target.value)
                            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                        }));
                      }}
                    />
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
                      }}
                    />
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
