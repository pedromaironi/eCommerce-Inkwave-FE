// reducers/cardReducers.js

import {
  ADD_PRODUCT_TO_FAVORITES,
  ADD_PRODUCT_TO_FAVORITES_ERROR,
  REMOVE_PRODUCT_FROM_FAVORITES,
  REMOVE_PRODUCT_FROM_FAVORITES_ERROR,
} from "../constants/cardConstants";

export const cardReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_FAVORITES:
      return {
        ...state,
        favoriteProduct: action.payload, // Puedes ajustar esto según tus necesidades
      };
    case ADD_PRODUCT_TO_FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case REMOVE_PRODUCT_FROM_FAVORITES:
      return {
        ...state,
        removedFavoriteProduct: action.payload,
      };
    case REMOVE_PRODUCT_FROM_FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
