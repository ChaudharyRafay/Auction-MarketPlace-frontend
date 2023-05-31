import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import BidPage from "./Component/bidPage/bidPage";
import PhoneLogin from "./Component/logins/phoneLogin";
import Home from "./Pages/Home";
import MultiProduct from "./Component/multiProduct/multiProduct";
import LiveAuction from "./Component/liveAuction/LiveAuction";

import PaymentInfo from "./Component/paymentInfo/PaymentInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMessage from "./Component/message/AdminMessage";
import Chat from "./Component/Chat/chat/chatBox";
import Footer from "./Component/home/Footer/Footer";
import EditProfile from "./Component/profile/editProfile/EditProfile";
import CreateProduct from "./Component/createProduct/CreateProduct";
import UserLooking from "./Component/userLookingProfile/userLooking";
import NotFound from "./Component/NotFound/index";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import WithNav from "./utils/WithNav";
import WithoutNav from "./utils/WithoutNav";
import SignUp from "./Component/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./reducers/authreducer";
import { BASEURL } from "../BASEURL";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        const result = await axios.post(`${BASEURL}/api/user/profile`, {
          userId: userData._id,
        });
        console.log(result);
        if (result.status == 200) {
          dispatch(setUserInfo(result.data.Profile));
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <ToastContainer style={{ marginTop: "80px" }} />
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/logins" element={<PhoneLogin />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/404 Not found" element={<NotFound />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<WithNav />}>
              <Route path="/" element={<Home />} />

              <Route path="/homePage2" element={<MultiProduct />} />
              <Route path="/bidPage/:productId" element={<BidPage />} />
              <Route path="/liveAuction" element={<LiveAuction />} />
              <Route
                path="/payment-info/:productId"
                element={<PaymentInfo />}
              />
              <Route path="/message" element={<AdminMessage />} />
              {/* <Route path="/message" element={<Chat />} /> */}
              <Route path="/profile" element={<EditProfile />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/user-profile" element={<UserLooking />} />
            </Route>
          </Route>
        </Routes>
        {/* Hide footer in specific pages */}
        {!(
          window.location.pathname === "/logins" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/404%20Not%20found"
        ) && <Footer />}
      </Router>
    </div>
  );
}

export default App;
