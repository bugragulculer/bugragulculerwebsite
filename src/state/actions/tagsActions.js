import {
  ADD_TAG,
  ADD_TAG_SUCCESS,
  REMOVE_TAG,
  REMOVE_TAG_SUCCESS,
  EDIT_TAG,
  EDIT_TAG_SUCCESS,
  GET_ALL_TAGS,
  GET_TAGS_SUCCESS,
} from "../../constants/constants";

export const addTag = (tag) => ({
  type: ADD_TAG,
  payload: tag,
});

export const addTagSuccess = (tag) => ({
  type: ADD_TAG_SUCCESS,
  payload: tag,
});

export const getAllTags = () => ({
  type: GET_ALL_TAGS,
});

export const getTagsSuccess = (tags) => ({
  type: GET_TAGS_SUCCESS,
  payload: tags,
});

export const removeTag = (id) => ({
  type: REMOVE_TAG,
  payload: id,
});

export const removeTagSuccess = (id) => ({
  type: REMOVE_TAG_SUCCESS,
  payload: id,
});

export const editTag = (id, updates) => ({
  type: EDIT_TAG,
  payload: {
    id,
    updates,
  },
});

export const editTagSuccess = (updates) => ({
  type: EDIT_TAG_SUCCESS,
  payload: updates,
});
