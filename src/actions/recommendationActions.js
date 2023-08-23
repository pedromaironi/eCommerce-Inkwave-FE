import axios from "axios";
import {
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_SUCCESS,
  GET_CLICK_RECOMMENDATIONS_FAILURE,
  GET_CLICK_RECOMMENDATIONS_REQUEST,
  GET_CLICK_RECOMMENDATIONS_SUCCESS,
} from "../constants/recommendationConstants";

export const recommendationBasedContent = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_RECOMMENDATIONS_REQUEST });
    const { userInfo } = getState().userLogin;

    let endpoint = `http://localhost:8080/api/v1/recommendation/${userInfo.id}`;

    const { data } = await axios.get(endpoint);

    dispatch({ type: GET_RECOMMENDATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RECOMMENDATIONS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clickRecommendationBasedContent =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_CLICK_RECOMMENDATIONS_REQUEST });
      const { userInfo } = getState().userLogin;

      let endpoint = `http://localhost:8080/api/v1/recommendation/interactions/${userInfo.id}`;

      const { data } = await axios.get(endpoint);

      dispatch({ type: GET_CLICK_RECOMMENDATIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CLICK_RECOMMENDATIONS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
