import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL } from "../../../BASEURL";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";

function Review({ product }) {
  const { productId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const [reviews, setreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    productId,
    userId: userInfo?._id,
    rating: 0,
    review: "",
  });
  // console.log(formData);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Remove error for the field if it has a value
    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const handleRatingClick = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form validation here

    // Check for empty fields
    const fieldErrors = {};
    let hasErrors = false;

    for (const key in formData) {
      if (!formData[key]) {
        fieldErrors[key] = true;
        hasErrors = true;
      }
    }

    setErrors(fieldErrors);

    // If any field is empty, return without submitting the form
    if (hasErrors) {
      console.log(hasErrors);
      return;
    }
    try {
      const result = await axios.post(
        `${BASEURL}/api/review/createReview`,
        formData
      );
      if (result.status == 200) {
        getData();
        setFormData({
          name: "",
          productId,
          userId: userInfo?._id,
          rating: 0,
          review: "",
        });
        toast.success("Review Successfull...");
        // navigate("/");
      }
    } catch (error) {
      toast.error("Server error! Try again");
    }
  };
  const getData = async () => {
    try {
      const result = await axios.post(`${BASEURL}/api/review/getReview`, {
        userId: product?.userId,
      });
      console.log(result);
      if (result.status == 200) {
        setreviews(result.data.reviews);
      }
    } catch (error) {
      toast.error("Server error.Refresh the page..");
    }
  };
  useEffect(() => {
    getData();
  }, [productId, product]);
  const renderStars = (item) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= item.rating) {
        // Render a filled star if the index is less than the rating
        stars.push(
          <Icon
            key={i}
            icon="ic:round-star"
            color="#FFD700" // Yellow color for filled stars
            width="24"
            height="24"
            className="ico"
          />
        );
      } else {
        // Render an empty star if the index is greater than or equal to the rating
        stars.push(
          <Icon
            key={i}
            icon="ic:round-star-border"
            color="#000" // Black color for empty stars
            width="24"
            height="24"
            className="ico"
          />
        );
      }
    }
    return stars;
  };
  return (
    <div>
      <h3 className="mt-3">Review</h3>
      <div className="review-product mt-2">
        {reviews.length
          ? reviews.map((item, index) => {
              return (
                <div className="review-container" key={index}>
                  <div className="left d-flex align-items-center">
                    <img
                      src={item ? `${BASEURL}/${item.userId?.image}` : null}
                      alt=""
                    />
                    <div>
                      <h6>
                        {item.name}
                        <span>– {moment(item?.timestamp).fromNow()}</span>
                      </h6>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <div className="right">{renderStars(item)}</div>
                </div>
              );
            })
          : null}
        {product?.paymentBy === userInfo?._id && !product?.review && (
          <div className="review-wrapper mb-4">
            {/* <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p> */}
            <p>
              Your rating *
              <div className="icon">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Icon
                    key={num}
                    icon="ic:round-star-border"
                    color={num <= formData.rating ? "#fcd703" : "#000"}
                    width="24"
                    height="24"
                    className="r-ico"
                    onClick={() => handleRatingClick(num)}
                  />
                ))}
              </div>
            </p>
            {errors.rating && (
              <p className="text-danger mt-1">* select rating points</p>
            )}
            <div className="name-mail d-flex flex-column ">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-danger mt-1">* Name is a required field</p>
              )}
              {/* <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  /> */}
            </div>
            <div>
              <textarea
                name="review"
                cols="30"
                rows="5"
                placeholder="Review"
                className="review-area"
                value={formData.review}
                onChange={handleInputChange}
              ></textarea>
              {errors.review && (
                <p className="text-danger mt-1">* Review is a required field</p>
              )}
            </div>

            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
