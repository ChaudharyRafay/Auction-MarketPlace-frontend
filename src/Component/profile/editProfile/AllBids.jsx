import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { BASEURL } from "../../../../BASEURL";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import { Link } from "react-router-dom";
function AllBids() {
  const [winnerProduct, setwinnerProduct] = useState([]);
  const [pendingProduct, setpendingProduct] = useState([]);
  const handleTime = (date) => {
    console.log(date);
    const timeAgo = moment(date).fromNow(); // Calculate the time difference
    console.log(timeAgo);
    return timeAgo;
  };
  const getWinnerProducts = async () => {
    const { _id } = JSON.parse(localStorage.getItem("userData"));
    const result = await axios.post(
      `${BASEURL}/api/product/getBidWinnerProducts`,
      { userId: _id }
    );
    console.log(result);
    if (result.status == 200) {
      setwinnerProduct(result.data.products);
      setpendingProduct(result.data.pendingProducts);
    }
  };
  useEffect(() => {
    getWinnerProducts();
  }, []);

  return (
    <div>
      <div className="productList-table">
        {winnerProduct?.length && (
          <>
            {" "}
            {winnerProduct?.map((item, index) => {
              return item.paymentBy ? null : (
                <div className="productList-table-content" key={index}>
                  <div className="head">
                    <h6>#</h6>
                    <p>{index + 1}</p>
                  </div>
                  <div className="head">
                    <h6>item</h6>
                    <div>
                      <Link to={`/bidPage/${item._id}`} className="">
                        <img src={`${BASEURL}/${item?.image}`} alt="" />
                      </Link>
                      <p>{item.itemName}</p>
                    </div>
                  </div>
                  <div className="head">
                    <h6>Actual price</h6>
                    <p>{item?.price} PKR</p>
                  </div>
                  <div className="head">
                    <h6>Total bid</h6>
                    <p>{item?.bidId?.length}</p>
                  </div>
                  <div className="head">
                    <h6>Auction Ended</h6>
                    {console.log(moment(item?.endDate).fromNow())}
                    <p>{moment(item?.endDate).fromNow()}</p>
                  </div>
                  <div className="head">
                    <h6>Status</h6>
                    <div>
                      <Badge className="mt-2" bg="success">
                        Winner
                      </Badge>{" "}
                    </div>
                  </div>
                  <div className="head">
                    <h6>PID</h6>
                    <p>{`${item?._id?.slice(0, 8)}...${item?._id.slice(
                      -2
                    )}`}</p>
                    <div className="sell-btn">
                      <Link to={`/payment-info/${item?._id}`}>
                        <button>Payment</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {pendingProduct?.length && (
          <>
            {" "}
            {pendingProduct?.map((item, index) => {
              return (
                <div className="productList-table-content" key={index}>
                  <div className="head">
                    <h6>#</h6>
                    <p>{index + 1}</p>
                  </div>
                  <div className="head">
                    <h6>item</h6>
                    <div>
                      <Link to={`/bidPage/${item._id}`} className="">
                        <img src={`${BASEURL}/${item?.image}`} alt="" />
                      </Link>
                      <p>{item.itemName}</p>
                    </div>
                  </div>
                  <div className="head">
                    <h6>Actual price</h6>
                    <p>{item?.price} PKR</p>
                  </div>
                  <div className="head">
                    <h6>Total bid</h6>
                    <p>{item?.bidId?.length}</p>
                  </div>

                  {/* <div className="head">
                    <h6>Highest</h6>
                    <p>600</p>
                  </div> */}
                  <div className="head">
                    <h6>Auction Ended</h6>
                    <p>{moment(item.endDate).from(moment())}</p>
                  </div>
                  <div className="head">
                    <h6>Status</h6>
                    <Badge className="mt-2" bg="warning">
                      pending
                    </Badge>{" "}
                  </div>
                  <div className="head">
                    <h6>PID</h6>
                    <p>{`${item?._id?.slice(0, 8)}...${item?._id.slice(
                      -2
                    )}`}</p>
                    <div className="sell-btn">
                      <Link to={`/bidPage/${item?._id}`}>
                        <button type="button">View</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {/* {console.log(winnerProduct?.paymentBy)}
        {winnerProduct?.length == 0 &&
          winnerProduct?.paymentBy &&
          pendingProduct?.length == 0 && (
            <>
              <p>sssss</p>
            </>
          )} */}
      </div>
    </div>
  );
}

export default AllBids;
