import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  profileData: [],
};

export const SelectCategoryProducts = createAsyncThunk(
  "SelectCategoryProducts",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/get_category_wise_product",
      body
    );
    return result;
  }
);
const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileData: (state, action) => {
      state.profileData = action.payload;
      console.log(state.profileData);
    },
  },
  extraReducers: {
    // [SelectCategoryProducts.fulfilled]: (state, { payload: { err, data } }) => {
    //   state.loading = false;
    //   if (err) {
    //     state.error = err;
    //   } else {
    //     state.Category_data = data;
    //   }
    // },
    // [SelectCategoryProducts.pending]: (state, action) => {
    //   state.loading = true;
    // },
  },
});
export const { profileData } = profile.actions;
export default profile.reducer;
