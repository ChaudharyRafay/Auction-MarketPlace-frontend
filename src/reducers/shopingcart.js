import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message:null,
  loading:false,
  error:null
};
const fetch2 = async (api, body) => {
    const res = await fetch(api, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
};
export const shoping_cart = createAsyncThunk("shopingCart", async (body) => {
    const result = await fetch2("http://localhost:8000/Products/addToCart", body);
    return result;
  });
const user_shoping_cart = createSlice({
  name: "shopingCart",
  initialState,
  reducers: {
  },
  extraReducers: {
    [shoping_cart.fulfilled]: (state, { payload: { error, message } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.message = message;
      }
    },
    [shoping_cart.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
export const {setDeliveryAddress } =
user_Address_reducer.actions;
export default user_Address_reducer.reducer;
