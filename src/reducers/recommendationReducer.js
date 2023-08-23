import {
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_RESET,
  GET_RECOMMENDATIONS_SUCCESS,
} from "../constants/recommendationConstants";

const initialState = {
  loading: false,
  products: [],
};

export const recommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMMENDATIONS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        recommendations: action.payload,
        error: false,
      };
    case GET_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_RECOMMENDATIONS_RESET:
      return initialState;
    default:
      return state;
  }
};
