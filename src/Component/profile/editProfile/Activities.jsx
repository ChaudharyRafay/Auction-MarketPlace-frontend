import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASEURL } from "../../../../BASEURL";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Activities() {
  const { userInfo } = useSelector((state) => state.user);
  const [reviewProducts, setreviewProducts] = useState([]);
  const getActivities = async () => {
    try {
      const result = await axios.post(`${BASEURL}/api/product/reviewProducts`, {
        userId: userInfo?._id,
      });
      console.log(result);
      if (result.status == 200) {
        setreviewProducts(result.data.reviewProduct);
      }
    } catch (error) {
      toast.error("Server error.Refresh the page...sssssss");
    }
  };
  useEffect(() => {
    getActivities();
  }, [userInfo]);

  return (
    <div className="productList-table">
      {reviewProducts.length ? (
        reviewProducts?.map((item, index) => {
          console.log(item);
          return item?.paymentBy == userInfo._id ? (
            <div className="productList-table-content activity-table-content">
              <div className="head">
                <h6>Event</h6>
                <p>Listed</p>
              </div>
              <div className="head">
                <h6>item</h6>
                <div>
                  <img
                    src={item?.image ? `${BASEURL}/${item.image}` : null}
                    alt=""
                  />
                  <p>{item.itemName}</p>
                </div>
              </div>
              <div className="head">
                <h6>price</h6>
                <p>{item.price} PKR</p>
              </div>
              <div className="head">
                <h6>Total Bid</h6>
                <p>{item.bidId.length}</p>
              </div>
              <div className="head">
                <h6>tx ID</h6>
                <p>{`${item?._id?.slice(0, 8)}...${item?._id.slice(-2)}`}</p>
              </div>
              <div className="head">
                <h6>Action</h6>
                <Link to={`/bidPage/${item?._id}`}>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "rgba(217, 49, 49, 0.8)",
                      color: "white",
                    }}
                    className="btn"
                  >
                    Review
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <img src="\profile\empty.png" alt="" />
            </>
          );
        })
      ) : (
        <>
          <img src="\profile\empty.png" alt="" />
        </>
      )}
    </div>
  );
}

export default Activities;
