import React, { useEffect, useState } from "react";
import "./editprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASEURL } from "../../../../BASEURL";
import { setUserInfo } from "../../../reducers/authreducer";
import { toast } from "react-toastify";
function Setting() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setformData] = useState({});
  const initialValues = () => {
    console.log(userInfo);
    if (userInfo) {
      const inital = {
        username: userInfo.username ? userInfo.username : "",
        twitter: userInfo.twitter ? userInfo.twitter : "",
        facebook: userInfo.facebook ? userInfo.facebook : "",
        discord: userInfo.discord ? userInfo.discord : "",
        bioDetail: userInfo.bioDetail ? userInfo.bioDetail : "",
      };
      setformData(inital);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      console.log(formData);
      const result = await axios.post(`${BASEURL}/api/user/setting`, {
        userId: userInfo._id,
        username: formData.username,
        facebook: formData.facebook,
        twitter: formData.twitter,
        discord: formData.discord,
        bioDetail: formData.bioDetail,
      });
      if (result.status == 200) {
        console.log(result.data.updated);
        dispatch(setUserInfo(result.data.updated));
        toast.success("New setting applied successfully!!");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };
  useEffect(() => {
    initialValues();
  }, [userInfo]);

  return (
    <div>
      <div className="profile-form-content">
        {/* <input type="text" placeholder="Display Name" className="d-name" /> */}
        <input
          type="text"
          placeholder="User Name"
          className="d-name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="social-links">
          <p>social links</p>
          <div className="row">
            <div className="col-md-4 col-12">
              <input
                type="text"
                className="d-name"
                placeholder="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 col-12">
              <input
                type="text"
                className="d-name"
                placeholder="Facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 col-12">
              <input
                type="text"
                className="d-name"
                placeholder="Discord"
                name="discord"
                value={formData.discord}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <textarea
          id=""
          className="d-name profile-description"
          placeholder="Bio Detail"
          name="bioDetail"
          value={formData.bioDetail}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}

export default Setting;
