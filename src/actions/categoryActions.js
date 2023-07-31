// In a separate file (e.g., categoryActions.js)
import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "../constants/categoriesConstants";

//! Category
export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`http://localhost:8080/api/v1/category`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
