// clicksReducer.js
import {
  ADD_INCREMENT_CLICKS,
  ADD_INCREMENT_CLICKS_ERROR,
} from "../constants/clicksConstants";

// Reducer para manejar la cantidad de clics
export const clicksReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_INCREMENT_CLICKS:
      return {
        ...state,
        productClicks: {
          ...state.productClicks,
          [action.payload.productId]: action.payload.clickCount,
        },
        error: null,
      };
    case ADD_INCREMENT_CLICKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
