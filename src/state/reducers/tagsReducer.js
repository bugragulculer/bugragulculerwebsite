const tagsReducer = (
  state = {
    lastRefKey: null,
    total: 0,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_TAGS_SUCCESS":
      return {
        ...state,
        lastRefKey: action.payload.lastRefKey,
        total: action.payload.total,
        items: [...action.payload.tags],
      };
    case "ADD_TAG_SUCCESS":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_TAG_SUCCESS":
      return {
        ...state,
        items: state.items.filter((tag) => tag.id !== action.payload),
      };
    case "EDIT_TAG_SUCCESS":
      return {
        ...state,
        items: state.items.map((tag) => {
          if (tag.id === action.payload.id) {
            return {
              ...tag,
              ...action.payload.updates,
            };
          }
          return tag;
        }),
      };
    default:
      return state;
  }
};

export default tagsReducer;
