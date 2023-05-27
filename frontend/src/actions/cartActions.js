import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SHIPPING_ADDRESS,
  CART_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// ALAN AI

// export const addToCartWithAlanAI = async (product) => {
//   const response = await axios.get(`/api/products/${id}`);
//   const alanProducts = response.data.products;

//   const alanProduct = alanProducts.find((product) => product.id === product.id);

//   if (alanProduct) {
//     dispatch({
//       type: CART_ADD_ITEM,
//       payload: {
//         product: alanProduct._id,
//         name: alanProduct.name,
//         image: alanProduct.image,
//         price: alanProduct.price,
//         countInStock: alanProduct.countInStock,
//         qty,
//       },
//     });
//   } else {
//     console.error('Product not found in Alan AI results');
//   }

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
// };
