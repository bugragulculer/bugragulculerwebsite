import { db } from ".";
import {
  doc,
  collection,
  setDoc,
  orderBy,
  getDocs,
  query,
  documentId,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// Get Single blogs Details from Firebase

export const addTag = async (id, tag) => {
  await setDoc(doc(db, "tags", id), tag);
};

export const generateKey = () => doc(collection(db, "tags")).id;

// Edit Product Details on Firebase Database
export const editTag = (id, updates) => updateDoc(doc(db, "tags", id), updates);

// Delete Product Details from Firebase Database
export const removeTag = (id) => deleteDoc(doc(db, "tags", id));

export const getAllTags = async () => {
  try {
    const blogRef = collection(db, "tags");
    const q = query(blogRef, orderBy(documentId()));
    const snapshot = await getDocs(q);
    const tags = [];

    snapshot.forEach((doc) =>
      tags.push(Object.assign({ id: doc.id }, doc.data()))
    );
    const lastKey = tags[tags.length - 1].id;

    return { tags, lastKey };
  } catch (e) {
    return (
      (e === null || e === void 0 ? void 0 : e.message) ||
      ":( Failed to fetch products."
    );
  }
};
