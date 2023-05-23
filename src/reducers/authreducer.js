import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  userInfo: null,
};

// export const signin = createAsyncThunk("signin", async (body) => {
//   const result = await fetch2("http://localhost:8000/signin", body);
//   return result;
// });

const authreducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
    },
  },
  extraReducers: {
    // [signupUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [reset.fulfilled]: (state, { payload: { error, message } }) => {
    //   //yeh error aur message backend say ai ga ismay ham nay destructure kia hja
    //   state.loading = false;
    //   if (error) {
    //     //agr user galat emial ya password enter krta ha tu yeh error ki state ko change kr day ga
    //     state.error = error;
    //   } else {
    //     state.error = message;
    //   }
    // },
  },
});
export const { setUserInfo } = authreducer.actions;
export default authreducer.reducer;
