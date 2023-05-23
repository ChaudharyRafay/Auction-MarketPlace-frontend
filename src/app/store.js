import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../reducers/authreducer";
import setUserInfo from "../reducers/holdingUserDate";
import user_address from "../reducers/delivery_address_state";
import profileData from "../reducers/profileReducer";
export const store = configureStore({
  reducer: {
    user: authreducer,
    userinfo: setUserInfo,
    user_address: user_address,
    profileData: profileData,
  },
});
