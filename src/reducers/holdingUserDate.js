import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId:null,
  userName:null,
  userEmail:null,
  userPhoto:null,
  isauthenticated: false,
//   token: "",
//   loading: false,
//   error: null,
};
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo:(state,action)=>{
      state.userId=action.payload.id;
      state.userName=action.payload.displayName;
      state.userEmail=action.payload.email;
      state.userPhoto=action.payload.userPhoto;
      state.isauthenticated=true;
    }
  },
});
export const { setUserInfo} =
userReducer.actions;
export default userReducer.reducer;
