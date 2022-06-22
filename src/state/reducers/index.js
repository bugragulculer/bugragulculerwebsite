import authReducer from "./authReducer";
import miscReducer from "./miscReducer";
import profileReducer from "./profileReducer";
import blogReducer from "./blogReducer";
import tagsReducer from "./tagsReducer";
import langReducer from "./langReducer";
import themeReducer from "./themeReducer";

const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  app: miscReducer,
  blog: blogReducer,
  tags: tagsReducer,
  lang: langReducer,
  theme: themeReducer,
};

export default rootReducer;
