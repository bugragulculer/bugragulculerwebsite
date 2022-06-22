import * as ACTION from "../../constants/constants";
import { takeLatest } from "redux-saga/effects";
import authSaga from "./authSaga";
import profileSaga from "./profileSaga";
import blogSaga from "./blogSaga";
import tagsSaga from "./tagsSaga";

function* rootSaga() {
  yield takeLatest(
    [
      ACTION.SIGNIN,
      ACTION.SIGNUP,
      ACTION.SIGNOUT,
      ACTION.SIGNIN_WITH_GOOGLE,
      ACTION.SIGNIN_WITH_FACEBOOK,
      ACTION.SIGNIN_WITH_GITHUB,
      ACTION.ON_AUTHSTATE_CHANGED,
      ACTION.ON_AUTHSTATE_SUCCESS,
      ACTION.ON_AUTHSTATE_FAIL,
      ACTION.SET_AUTH_PERSISTENCE,
      ACTION.RESET_PASSWORD,
    ],
    authSaga
  );
  yield takeLatest(
    [
      ACTION.GET_ALL_BLOG,
      ACTION.GET_BLOG,
      ACTION.ADD_BLOG,
      ACTION.EDIT_BLOG,
      ACTION.REMOVE_BLOG,
      ACTION.SEARCH_BLOG,
    ],
    blogSaga
  );
  yield takeLatest(
    [ACTION.ADD_TAG, ACTION.GET_ALL_TAGS, ACTION.REMOVE_TAG, ACTION.EDIT_TAG],
    tagsSaga
  );
  yield takeLatest(
    [
      ACTION.UPDATE_EMAIL,
      ACTION.UPDATE_PROFILE,
      ACTION.ADD_BLOG_FAVORITE,
      ACTION.REMOVE_BLOG_FAVORITE,
      ACTION.ADD_PRODUCT_FAVORITE,
      ACTION.REMOVE_PRODUCT_FAVORITE,
    ],
    profileSaga
  );
}

export default rootSaga;
