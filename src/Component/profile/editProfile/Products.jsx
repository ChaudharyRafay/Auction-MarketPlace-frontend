import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASEURL } from "../../../../BASEURL";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  const handleDelete = async (productId) => {
    try {
      const result = await axios.post(`${BASEURL}/api/product/deleteProduct`, {
        productId: productId,
      });
      if (result.status == 200) {
        toast.success("Product deleted successfully...");
        getUserProduct();
      }
    } catch (error) {
      console.log(error);
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
                      {/* <h2>item {index + 1}</h2> */}
                      <div>
                        <p
                          className="bg-danger"
                          style={{
                            fontSize: "13px",
                            cursor: "pointer",
                            color: "white",
                          }}
                          onClick={() => handleDelete(item?._id)}
                        >
                          Delete
                        </p>
                      </div>
                      <div>
                        <div>
                          <p
                            className=""
                            style={{
                              fontSize: "13px",
                              cursor: "pointer",
                            }}
                          >
                            {handleActive(item)}
                          </p>
                        </div>
                        {/* <Link to={`/bidPage/${item._id}`}>View</Link> */}
                      </div>
                    </div>
                    <div className="dlt mt-2">
                      <Link to={`/bidPage/${item._id}`}>View</Link>
                      {/* <p style={{ fontSize: "13px" }}>{handleActive(item)}</p> */}
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
