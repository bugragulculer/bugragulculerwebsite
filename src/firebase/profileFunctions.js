import { db, auth } from "./";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const addBlogFavorite = async (blog) => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    blogFavorites: arrayUnion(blog),
  });
};

export const removeBlogFavorite = async (blog) => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    blogFavorites: arrayRemove(blog),
  });
};

export const addProductFavorite = async (product) => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    productFavorites: arrayUnion(product),
  });
};

export const removeProductFavorite = async (product) => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    productFavorites: arrayRemove(product),
  });
};
