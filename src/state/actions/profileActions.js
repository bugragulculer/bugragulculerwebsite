import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_EMAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  ADD_BLOG_FAVORITE,
  ADD_PRODUCT_FAVORITE,
  REMOVE_BLOG_FAVORITE,
  REMOVE_PRODUCT_FAVORITE,
  ADD_BLOG_FAVORITE_SUCCESS,
  REMOVE_BLOG_FAVORITE_SUCCESS,
  ADD_PRODUCT_FAVORITE_SUCCESS,
  REMOVE_PRODUCT_FAVORITE_SUCCESS,
} from "../../constants/constants";

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

export const setProfile = (user) => ({
  type: SET_PROFILE,
  payload: user,
});

export const updateEmail = (password, newEmail) => ({
  type: UPDATE_EMAIL,
  payload: {
    password,
    newEmail,
  },
});

export const updateProfile = (newProfile) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    files: newProfile.files,
    credentials: newProfile.credentials,
  },
});

export const updateProfileSuccess = (updates) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates,
});

export const addBlogFavorite = (payload) => ({
  type: ADD_BLOG_FAVORITE,
  payload: payload,
});

export const removeBlogFavorite = (payload) => ({
  type: REMOVE_BLOG_FAVORITE,
  payload: payload,
});

export const addBlogFavoriteSuccess = (blog) => ({
  type: ADD_BLOG_FAVORITE_SUCCESS,
  payload: blog,
});

export const removeBlogFavoriteSuccess = (blog) => ({
  type: REMOVE_BLOG_FAVORITE_SUCCESS,
  payload: blog,
});

export const addProductFavorite = (id) => ({
  type: ADD_PRODUCT_FAVORITE,
  payload: id,
});

export const removeProductFavorite = (id) => ({
  type: REMOVE_PRODUCT_FAVORITE,
  payload: id,
});

export const addProductFavoriteSuccess = (id) => ({
  type: ADD_PRODUCT_FAVORITE_SUCCESS,
  payload: id,
});

export const removeProductFavoriteSuccess = (id) => ({
  type: REMOVE_PRODUCT_FAVORITE_SUCCESS,
  payload: id,
});
