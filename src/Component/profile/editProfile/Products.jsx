import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASEURL } from "../../../../BASEURL";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [userProducts, setuserProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const getUserProduct = async () => {
    if (userInfo) {
      const result = await axios.post(`${BASEURL}/api/user/getUserProduct`, {
        userId: userInfo._id,
      });
      if (result.status == 200) {
        setuserProducts(result.data.userProduct);
      }
    }
  };
  useEffect(() => {
    getUserProduct();
  }, [userInfo]);
  const handleActive = (item) => {
    const currentDate = new Date();
    const endDate = new Date(item.endDate);
    if (endDate >= currentDate) {
      return "active";
    } else {
      return "expire";
    }
  };
  return (
    <div>
      <div className="my-items">
        {userProducts.length ? (
          <>
            {userProducts?.map((item, index) => {
              return (
                <div className="my-item-card" key={index}>
                  <div className="left">
                    <img src={`${BASEURL}/${item.image}`} alt="" />
                  </div>
                  <div className="right">
                    <h1>{item.itemName}</h1>
                    <p style={{ marginTop: "15px" }}>{item.description}</p>
                    <div>
                      <h2>item {index + 1}</h2>
                      <Link to={`/bidPage/${item._id}`}>View</Link>
                    </div>
                    <div className="dlt">
                      <p style={{ fontSize: "13px" }}>{handleActive(item)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <img src="\profile\empty.png" alt="" />
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
