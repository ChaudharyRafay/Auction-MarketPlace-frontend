import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  delivery_address_province: null,
  delivery_address_city: null,
  delivery_address_homeAddress: null,
  processing: false,
  error: null,
  message: null,
  questions: [],
  dummy_products: [],
  All_Products: [],
  fav: "white",
  postSize: 6,
  product_data: [],
  photo: [],
  main_photo: "",
  usercartLength: 0,
  usercartdetails: [],
  top_loading: false,
  cart: [],
  totalprice: 0,
  shipping_fee: 0,
  grand_total: 0,
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
const fetch1 = async (api, body) => {
  const res = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
export const allProduct = createAsyncThunk("allProduct", async (body) => {
  const url = body.url;
  const result = await fetch1(url);
  return result;
});
export const store_address = createAsyncThunk("store_address", async (body) => {
  const result = await fetch2("http://localhost:8000/store_address", body);
  return result;
});
export const get_address = createAsyncThunk("get_address", async (body) => {
  const result = await fetch2("http://localhost:8000/get_address", body);
  return result;
});
export const shoping_cart = createAsyncThunk("shopingCart", async (body) => {
  const result = await fetch2(
    "http://localhost:8000/Products/shopingCart",
    body
  );
  return result;
});
export const whishlist = createAsyncThunk("whishlist", async (body) => {
  const result = await fetch2("http://localhost:8000/Products/whishlist", body);
  return result;
});
export const check_Whishlist = createAsyncThunk("whishlist", async (body) => {
  const result = await fetch2(
    "http://localhost:8000/Products/check_Whishlist",
    body
  );
  return result;
});
export const product_detail = createAsyncThunk(
  "product_detail",
  async (body) => {
    const url = `http://localhost:8000/Products/get_specific_product/${body}`;
    const result = await fetch1(url);
    return result;
  }
);
export const usercartLength = createAsyncThunk(
  "usercartLength",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/userCartLength",
      body
    );
    return result;
  }
);
export const usercartInfo = createAsyncThunk("userCartInfo", async (body) => {
  const result = await fetch2(
    "http://localhost:8000/Products/userCartInfo",
    body
  );
  return result;
});
export const add_product_to_checkout = createAsyncThunk(
  "add_product_to_checkout",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/add_product_to_checkout",
      body
    );
    return result;
  }
);
export const deleteItemCart = createAsyncThunk(
  "deleteItemCart",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/deleteItemCart",
      body
    );
    return result;
  }
);
export const handle_product_quantity = createAsyncThunk(
  "handle_product_quantity",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/handleProductQuantity",
      body
    );
    return result;
  }
);
export const handleCartToWhishlist = createAsyncThunk(
  "handleCartToWhishlist",
  async (body) => {
    const result = await fetch2(
      "http://localhost:8000/Products/MoveCartToWhishlist",
      body
    );
    return result;
  }
);
const user_Address_reducer = createSlice({
  name: "user_address",
  initialState,
  reducers: {
    displayMessage1: (state, action) => {
      state.message = action.payload;
    },
    changeImage: (state, action) => {
      state.main_photo = action.payload.imageurl;
    },
    sortAsc: (state, action) => {
      state.All_Products = state.All_Products.sort((a, b) =>
        a.drop_price > b.drop_price ? 1 : -1
      );
    },
    sortDesc: (state, action) => {
      state.All_Products = state.All_Products.sort((a, b) =>
        a.drop_price < b.drop_price ? 1 : -1
      );
    },
    bestMatches: (state, action) => {
      state.All_Products = state.All_Products.sort(() => Math.random() - 0.5);
    },
    handleAddTotalPrice: (state, { payload: { p } }) => {
      state.totalprice = state.totalprice + p;
    },
    handleSubtTotalPrice: (state, { payload: { p } }) => {
      if (state.totalprice == 0) {
        return;
      }
      state.totalprice = state.totalprice - p;
    },
    handleTotalPrice: (state, { payload: { p, fee } }) => {
      let price = 0;
      state.totalprice = price;
      state.totalprice = state.totalprice + p;
      state.shipping_fee = fee;
      state.grand_total = state.totalprice + state.shipping_fee;
    },
  },
  extraReducers: {
    [allProduct.fulfilled]: (
      state,
      { payload: { error, products, postSize } }
    ) => {
      if (error) {
        state.error = error;
      } else {
        state.All_Products = [...state.All_Products, ...products];
        state.postSize = postSize;
        //for duplicating products whn we click specific prduct and come back tu hompage then agaiun use effect call and duplicate products occur thats why w use this logic
        let pp = state.All_Products.filter(
          (ele, ind) =>
            ind === state.All_Products.findIndex((elem) => elem._id === ele._id)
        );
        state.All_Products = pp;
      }
    },
    [product_detail.fulfilled]: (
      state,
      { payload: { products, photo, main_photo, error, questions } }
    ) => {
      state.processing = false;
      if (error) {
        state.error = error;
      } else {
        state.product_data = products;
        state.photo = photo;
        state.main_photo = main_photo;
        state.questions = questions;
      }
    },
    [product_detail.pending]: (state, action) => {
      state.processing = true;
    },
    [store_address.fulfilled]: (
      state,
      { payload: { error, message, address } }
    ) => {
      if (error) {
        state.error = error;
      } else {
        state.error = message;
        state.delivery_address_province = address[0].province;
        state.delivery_address_city = address[0].city;
        state.delivery_address_homeAddress = address[0].address;
      }
    },
    [get_address.fulfilled]: (
      state,
      { payload: { error, province, city, address } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.delivery_address_province = province;
        state.delivery_address_city = city;
        state.delivery_address_homeAddress = address;
      }
    },
    [get_address.pending]: (state, action) => {
      state.processing = true;
    },
    [shoping_cart.fulfilled]: (state, { payload: { error, message } }) => {
      state.processing = false;
      if (error) {
        state.message = error;
      } else {
        state.message = message;
      }
    },
    [shoping_cart.pending]: (state, action) => {
      state.processing = true;
    },
    [whishlist.fulfilled]: (
      state,
      { payload: { error, message, success } }
    ) => {
      state.processing = false;
      if (error) {
        state.message = error;
      } else if (success) {
        state.fav = "red";
      } else if (!success) {
        state.fav = "white";
      }
    },
    [check_Whishlist.fulfilled]: (state, { payload: { error, success } }) => {
      state.processing = false;
      if (error) {
        state.message = error;
      } else if (success) {
        state.fav = "red";
      } else if (!success) {
        state.fav = "white";
      }
    },
    [usercartLength.fulfilled]: (state, { payload: { error, length } }) => {
      // state.processing = false;
      if (error) {
        state.message = error;
      } else {
        state.usercartLength = length;
        // state.usercartdetails.map(({drop_price,})=>{
        //    state.totalprice=state.totalprice+drop_price;

        // })
        // state.cart=cart;
      }
    },
    [usercartLength.pending]: (state, action) => {
      // state.processing = true;
    },
    [usercartInfo.fulfilled]: (
      state,
      { payload: { error, success, cart } }
    ) => {
      // state.processing = false;
      if (error) {
        state.message = error;
      } else {
        state.usercartdetails = success;
        state.cart = cart;
      }
    },
    [usercartInfo.pending]: (state, action) => {
      // state.processing = true;
    },
    [add_product_to_checkout.fulfilled]: (
      state,
      { payload: { error, data } }
    ) => {
      // state.processing = false;
      if (error) {
        state.message = error;
      } else {
        state.cart = data;
      }
    },
    [add_product_to_checkout.pending]: (state, action) => {
      // state.processing = true;
    },
    [deleteItemCart.fulfilled]: (
      state,
      { payload: { error, success, cart, cartLength } }
    ) => {
      state.top_loading = false;
      if (error) {
        state.message = error;
      } else {
        state.usercartdetails = success;
        state.usercartLength = cartLength;
        state.cart = cart;
      }
    },
    [deleteItemCart.pending]: (state, action) => {
      state.top_loading = true;
    },
    [handle_product_quantity.fulfilled]: (
      state,
      { payload: { error, cart } }
    ) => {
      state.top_loading = false;
      if (error) {
        state.message = error;
      } else {
        state.cart = cart;
      }
    },
    [handle_product_quantity.pending]: (state, action) => {
      state.top_loading = true;
    },
    [handleCartToWhishlist.fulfilled]: (
      state,
      { payload: { success, cart, cartLength } }
    ) => {
      state.top_loading = false;
      state.usercartdetails = success;
      state.cart = cart;
      state.usercartLength = cartLength;
    },
    [handleCartToWhishlist.pending]: (state, action) => {
      state.top_loading = true;
    },
  },
});

export const {
  displayMessage1,
  changeImage,
  sortAsc,
  sortDesc,
  bestMatches,
  handleTotalPrice,
  handleAddTotalPrice,
  handleSubtTotalPrice,
} = user_Address_reducer.actions;
export default user_Address_reducer.reducer;
