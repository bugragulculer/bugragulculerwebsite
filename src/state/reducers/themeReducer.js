const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
