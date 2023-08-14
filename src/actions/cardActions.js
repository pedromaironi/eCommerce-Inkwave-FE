import axios from "axios";

import {
  ADD_PRODUCT_TO_FAVORITES,
  ADD_PRODUCT_TO_FAVORITES_ERROR,
  REMOVE_PRODUCT_FROM_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES_ERROR,
} from "../constants/cardConstants";

export const addProductFavorite = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:8080/api/v1/products/favorite/${userInfo.id}/${id}`,
      config
    );

    dispatch({
      type: ADD_PRODUCT_TO_FAVORITES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_TO_FAVORITES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductFavorite = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `http://localhost:8080/api/v1/products/favorite/${userInfo.id}/${id}`,
      config
    );

    dispatch({
      type: REMOVE_PRODUCT_FROM_FAVORITES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FROM_FAVORITES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
