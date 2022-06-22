import {
  ADD_BLOG,
  ADD_BLOG_SUCCESS,
  GET_ALL_BLOG,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  REMOVE_BLOG,
  REMOVE_BLOG_SUCCESS,
  EDIT_BLOG,
  EDIT_BLOG_SUCCESS,
  CANCEL_GET_BLOG,
  SEARCH_BLOG,
  SEARCH_BLOG_SUCCESS,
  CLEAR_BLOG_SEARCH_STATE,
} from "../../constants/constants";

export const getBlog = (lastRef) => ({
  type: GET_BLOG,
  payload: lastRef,
});

export const getAllBlog = () => ({
  type: GET_ALL_BLOG,
});

export const getBlogSuccess = (product) => ({
  type: GET_BLOG_SUCCESS,
  payload: product,
});

export const cancelGetBLOG = () => ({
  type: CANCEL_GET_BLOG,
});

export const searchBlog = (searchKey) => ({
  type: SEARCH_BLOG,
  payload: {
    searchKey,
  },
});

export const searchBlogSuccess = (products) => ({
  type: SEARCH_BLOG_SUCCESS,
  payload: products,
});

export const clearSearchState = () => ({
  type: CLEAR_BLOG_SEARCH_STATE,
});

export const addBlog = (blog) => ({
  type: ADD_BLOG,
  payload: blog,
});

export const addBlogSuccess = (blog) => ({
  type: ADD_BLOG_SUCCESS,
  payload: blog,
});

export const removeBlog = (id) => ({
  type: REMOVE_BLOG,
  payload: id,
});

export const removeBlogSuccess = (id) => ({
  type: REMOVE_BLOG_SUCCESS,
  payload: id,
});

export const editBlog = (id, updates) => ({
  type: EDIT_BLOG,
  payload: {
    id,
    updates,
  },
});

export const editBlogSuccess = (updates) => ({
  type: EDIT_BLOG_SUCCESS,
  payload: updates,
});
