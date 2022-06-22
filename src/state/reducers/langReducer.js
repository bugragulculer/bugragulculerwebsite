const langReducer = (state = "en", action) => {
  switch (action.type) {
    case "CHANGE_LANG":
      return action.payload;
    default:
      return state;
  }
};

export default langReducer;
