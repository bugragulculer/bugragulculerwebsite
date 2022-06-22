import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  ADD_BLOG_FAVORITE_SUCCESS,
  ADD_PRODUCT_FAVORITE_SUCCESS,
  REMOVE_BLOG_FAVORITE_SUCCESS,
  REMOVE_PRODUCT_FAVORITE_SUCCESS,
} from "../../constants/constants";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE:
      console.log("action", action.payload);
      return action.payload;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_PROFILE:
      return {};
    case ADD_BLOG_FAVORITE_SUCCESS:
      console.log(action, "asdf");
      return {
        ...state,
        blogFavorites: [...state.blogFavorites, action.payload],
      };
    case REMOVE_BLOG_FAVORITE_SUCCESS:
      return {
        ...state,
        blogFavorites: state.blogFavorites.filter(
          (blog) => blog !== action.payload
        ),
      };
    case ADD_PRODUCT_FAVORITE_SUCCESS:
      console.log(action, "asdf");
      return {
        ...state,
        productFavorites: [...state.productFavorites, action.payload],
      };
    case REMOVE_PRODUCT_FAVORITE_SUCCESS:
      return {
        ...state,
        productFavorites: state.productFavorites.filter(
          (blog) => blog !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default profileReducer;
