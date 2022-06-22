import {
  ADD_BLOG,
  GET_ALL_BLOG,
  GET_BLOG,
  REMOVE_BLOG,
  EDIT_BLOG,
  SEARCH_BLOG,
} from "../../constants/constants";
import { ADMIN_BLOG } from "../../constants/routes";
import { displayActionMessage } from "../../utils";
import { all, call, put, select } from "redux-saga/effects";
import { setLoading, setRequestStatus } from "../actions/miscActions";
import { history } from "../../";
import {
  addBlogSuccess,
  getBlogSuccess,
  removeBlogSuccess,
  editBlogSuccess,
  searchBlogSuccess,
  clearSearchState,
} from "../actions/blogActions";
import {
  generateKey,
  storeImage,
  addBlog,
  getBlog,
  getAllBlog,
  editBlog,
  removeBlog,
  searchBlog,
} from "../../firebase/blogFunctions";

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

function* blogSaga({ type, payload }) {
  switch (type) {
    case GET_ALL_BLOG:
      try {
        yield initRequest();
        console.log("payload", payload);
        const result = yield call(getAllBlog);
        console.log("result", result);
        if (result.blog.length === 0) {
          handleError("No items found.");
        } else {
          yield put(
            getBlogSuccess({
              blog: result.blog,
              lastRefKey: result.lastKey,
              total: result.blog.length,
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

    case GET_BLOG:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(getBlog, payload);
        if (result.products.length === 0) {
          handleError("No items found.");
        } else {
          yield put(
            getBlogSuccess({
              products: result.products,
              lastKey: result.lastKey
                ? result.lastKey
                : state.products.lastRefKey,
              total: result.total ? result.total : state.products.total,
            })
          );
          yield put(setRequestStatus(""));
        }
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    case ADD_BLOG:
      try {
        yield initRequest();

        const { images } = payload;
        const key = yield call(generateKey);

        let imageCollection = [];
        if (images.length !== 0) {
          const imageKeys = yield all(images.map(() => generateKey));
          const imageUrls = yield all(
            images.map((img, i) =>
              storeImage(imageKeys[i](), "products", img.file)
            )
          );
          imageCollection = imageUrls.map((url, i) => ({
            id: imageKeys[i](),
            url,
          }));
        }

        const product = {
          ...payload,
          images: [...imageCollection],
        };

        yield call(addBlog, key, product);
        yield put(
          addBlogSuccess({
            id: key,
            ...product,
          })
        );
        yield handleAction(ADMIN_BLOG, "Item succesfully added", "success");
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
    case REMOVE_BLOG: {
      try {
        yield initRequest();
        yield call(removeBlog, payload);
        yield put(removeBlogSuccess(payload));
        yield put(setLoading(false));
        yield handleAction(ADMIN_BLOG, "Item succesfully removed", "success");
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
    case EDIT_BLOG: {
      try {
        yield initRequest();
        // add image thumbnail to image collection from newUpdates to
        // make sure you're adding the url not the file object.
        console.log(payload);
        yield call(editBlog, payload.id, payload.updates);
        console.log("here2");
        yield put(
          editBlogSuccess({
            id: payload.id,
            updates: payload.updates,
          })
        );
        yield handleAction(ADMIN_BLOG, "Item succesfully edited", "success");
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
    case SEARCH_BLOG: {
      try {
        yield initRequest();
        // clear search data
        yield put(clearSearchState());

        const state = yield select();
        console.log("ok");
        const result = yield call(searchBlog, payload.searchKey);

        if (result.products.length === 0) {
          yield handleError({ message: "No product found." });
          yield put(clearSearchState());
        } else {
          yield put(
            searchBlogSuccess({
              products: result.products,
              lastKey: result.lastKey
                ? result.lastKey
                : state.products.searchedProducts.lastRefKey,
              total: result.total
                ? result.total
                : state.products.searchedProducts.total,
            })
          );
          yield put(setRequestStatus(""));
        }
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default blogSaga;
