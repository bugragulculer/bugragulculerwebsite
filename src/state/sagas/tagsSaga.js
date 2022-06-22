import { call, put } from "redux-saga/effects";
import { setLoading, setRequestStatus } from "../actions/miscActions";
import { displayActionMessage } from "../../utils";
import { history } from "../../";
import {
  addTagSuccess,
  getTagsSuccess,
  removeTagSuccess,
  editTagSuccess,
} from "../actions/tagsActions";
import {
  ADD_TAG,
  REMOVE_TAG,
  EDIT_TAG,
  GET_ALL_TAGS,
} from "../../constants/constants";
import {
  generateKey,
  addTag,
  getAllTags,
  editTag,
  removeTag,
} from "../../firebase/tagsFunctions";
import { ADMIN_TAGS } from "../../constants/routes";

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

function* tagsSaga({ type, payload }) {
  switch (type) {
    case GET_ALL_TAGS:
      try {
        yield initRequest();
        const result = yield call(getAllTags);

        if (result.tags.length === 0) {
          handleError("No items found.");
        } else {
          yield put(
            getTagsSuccess({
              tags: result.tags,
              lastRefKey: result.lastKey,
              total: result.tags.length,
            })
          );
          yield put(setRequestStatus(""));
        }
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    case ADD_TAG:
      try {
        yield initRequest();

        const key = yield call(generateKey);

        const product = {
          ...payload,
        };

        yield call(addTag, key, product);
        yield put(
          addTagSuccess({
            id: key,
            ...product,
          })
        );
        yield handleAction(ADMIN_TAGS, "Item succesfully added", "success");
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
    case REMOVE_TAG: {
      try {
        yield initRequest();
        yield call(removeTag, payload);
        yield put(removeTagSuccess(payload));
        yield put(setLoading(false));
        yield handleAction(ADMIN_TAGS, "Item succesfully removed", "success");
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to remove: ${e.message}`,
          "error"
        );
      }
      break;
    }
    case EDIT_TAG: {
      try {
        yield initRequest();
        let newUpdates = { ...payload.updates };
        newUpdates = {
          ...newUpdates,
        };
        // add image thumbnail to image collection from newUpdates to
        // make sure you're adding the url not the file object.

        yield call(editTag, payload.id, newUpdates);
        yield put(
          editTagSuccess({
            id: payload.id,
            updates: newUpdates,
          })
        );
        yield handleAction(ADMIN_TAGS, "Item succesfully edited", "success");
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(
          undefined,
          `Item failed to edit: ${e.message}`,
          "error"
        );
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default tagsSaga;
