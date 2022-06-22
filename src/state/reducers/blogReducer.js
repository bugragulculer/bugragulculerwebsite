import {
  ADD_BLOG_SUCCESS,
  GET_BLOG_SUCCESS,
  REMOVE_BLOG_SUCCESS,
  EDIT_BLOG_SUCCESS,
  SEARCH_BLOG_SUCCESS,
  CLEAR_BLOG_SEARCH_STATE,
} from "../../constants/constants";

const initState = {
  lastRefKey: null,
  total: 0,
  items: [],
};

const blogReducer = (
  state = {
    lastRefKey: null,
    total: 0,
    items: [],
    searched: initState,
  },
  action
) => {
  switch (action.type) {
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastRefKey,
        total: action.payload.total,
        items: [...action.payload.blog],
      };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case SEARCH_BLOG_SUCCESS:
      return {
        ...state,
        searchedBlog: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedBlog.items, ...action.payload.blog],
        },
      };
    case CLEAR_BLOG_SEARCH_STATE:
      return {
        ...state,
        searchedProducts: initState,
      };
    case REMOVE_BLOG_SUCCESS:
      return {
        ...state,
        items: state.items.filter((blog) => blog.id !== action.payload),
      };
    case EDIT_BLOG_SUCCESS:
      return {
        ...state,
        items: state.items.map((blog) => {
          if (blog.id === action.payload.id) {
            return {
              ...blog,
              ...action.payload.updates,
            };
          }
          return blog;
        }),
      };
    default:
      return state;
  }
};

export default blogReducer;
