import {
  ADD_BLOG_FAVORITE,
  ADD_PRODUCT_FAVORITE,
  REMOVE_BLOG_FAVORITE,
  REMOVE_PRODUCT_FAVORITE,
  UPDATE_EMAIL,
  UPDATE_PROFILE,
} from "../../constants/constants";
import { ACCOUNT } from "../../constants/routes";
import { call, put, select } from "redux-saga/effects";
import { history } from "../../";
import { setLoading, setRequestStatus } from "../actions/miscActions";
import {
  addBlogFavoriteSuccess,
  addProductFavoriteSuccess,
  removeBlogFavoriteSuccess,
  removeProductFavoriteSuccess,
  updateProfileSuccess,
} from "../actions/profileActions";
import { updateEmail, updateProfile } from "../../firebase/authFunctions";
import {
  addBlogFavorite,
  addProductFavorite,
  removeBlogFavorite,
  removeProductFavorite,
} from "../../firebase/profileFunctions";
import { displayActionMessage } from "../../utils";

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || "Failed to fetch blog posts"));
  console.log("ERROR: ", e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* profileSaga({ type, payload }) {
  switch (type) {
    case UPDATE_EMAIL: {
      try {
        yield put(setLoading(false));
        yield call(updateEmail, payload.password, payload.newEmail);

        yield put(setLoading(false));
        yield call(history.push, "/profile");
        yield call();
        //displayActionMessage,
        //"Email Updated Successfully!",
        //"success"
      } catch (e) {
        console.log(e.message);
      }
      break;
    }
    case UPDATE_PROFILE: {
      try {
        const state = yield select();
        const { email, password } = payload.credentials;

        yield put(setLoading(true));

        if (email && password && email !== state.profile.email) {
          yield call(updateEmail, password, email);
        }
        yield call(updateProfile, state.auth.id, payload.updates);
        yield put(updateProfileSuccess(payload.updates));

        yield put(setLoading(false));
        yield call(history.push, ACCOUNT);
        yield call();
        //displayActionMessage,
        //"Profile Updated Successfully!",
        //"success"
      } catch (e) {
        yield put(setLoading(false));
        if (e.code === "auth/wrong-password") {
          yield call();
          //displayActionMessage,
          //"Wrong password, profile update failed :(",
          //"error"
        } else {
          yield call();
          //displayActionMessage,
          //`:( Failed to update profile. ${e.message ? e.message : ""}`,
          //"error"
        }
      }
      break;
    }
    case ADD_BLOG_FAVORITE: {
      try {
        yield initRequest();
        yield call(addBlogFavorite, payload);
        yield put(addBlogFavoriteSuccess(payload));
        yield call(displayActionMessage, "Favorited", "success");
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to add: ${e?.message}`,
          "error"
        );
      }
      break;
    }
    case REMOVE_BLOG_FAVORITE: {
      try {
        yield initRequest();

        yield call(removeBlogFavorite, payload);
        yield put(removeBlogFavoriteSuccess(payload));
        yield call(displayActionMessage, "Favorite Removed", "success");
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to add: ${e?.message}`,
          "error"
        );
      }
      break;
    }
    case ADD_PRODUCT_FAVORITE: {
      try {
        yield initRequest();
        yield call(addProductFavorite, payload);
        yield put(addProductFavoriteSuccess(payload));
        yield call(displayActionMessage, "Favorited", "success");
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to add: ${e?.message}`,
          "error"
        );
      }
      break;
    }
    case REMOVE_PRODUCT_FAVORITE: {
      try {
        yield initRequest();

        yield call(removeProductFavorite, payload);
        yield put(removeProductFavoriteSuccess(payload));
        yield call(displayActionMessage, "Favorite Removed", "success");
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to add: ${e?.message}`,
          "error"
        );
      }
      break;
    }
    default: {
      throw new Error("Unexpected action type.");
    }
  }
}

export default profileSaga;
