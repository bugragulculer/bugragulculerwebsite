import { storage, db, firebase } from "./";
import {
  doc,
  collection,
  setDoc,
  orderBy,
  getDocs,
  query,
  documentId,
  updateDoc,
  deleteDoc,
  getDoc,
  where,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// -------------------------- v9 Versions ------------------------------

// Get a single blog article
export const getSingleBlog = (id) => getDoc(doc(db, "blog", id));

// Add a single blog article
export const addBlog = async (id, product) => {
  await setDoc(doc(db, "blog", id), product);
};

// Edit a single blog article
export const editBlog = (id, updates) =>
  updateDoc(doc(db, "blog", id), updates);

// Remove a single blog article
export const removeBlog = (id) => deleteDoc(doc(db, "blog", id));

// Genereate a new key on blog folder
export const generateKey = () => doc(collection(db, "blog")).id;

// Store an image
export const storeImage = async (id, folder, imageFile) => {
  const storageRef = ref(storage);
  const snapshot = await ref(storageRef, id);
  const uploadTask = await uploadBytes(snapshot, imageFile);
  const downloadURL = await getDownloadURL(uploadTask.ref);

  return downloadURL;
};

// Get featured blog articles
export const getFeaturedBlog = (itemsCount) =>
  getDocs(
    query(
      collection(db, "blog"),
      where("isFeatured", "==", "on"),
      limit(itemsCount)
    )
  );

// Get all blog articles
export const getAllBlog = async () => {
  try {
    const blogRef = collection(db, "blog");
    const q = query(blogRef, orderBy(documentId()));
    const snapshot = await getDocs(q);
    const blog = [];

    snapshot.forEach((doc) =>
      blog.push(Object.assign({ id: doc.id }, doc.data()))
    );
    const lastKey = blog[blog.length - 1].id;

    return { blog, lastKey };
  } catch (e) {
    return (
      (e === null || e === void 0 ? void 0 : e.message) ||
      ":( Failed to fetch products."
    );
  }
};

// -------------------------- v8 Versions ------------------------------

export const getBlog = (lastRefKey) => {
  let didTimeout = false;
  return new Promise((resolve, reject) => {
    (async () => {
      if (lastRefKey) {
        try {
          const query = db
            .collection("products")
            .orderBy(firebase.firestore.FieldPath.documentId())
            .startAfter(lastRefKey)
            .limit(12);
          const snapshot = await query.get();
          const products = [];
          snapshot.forEach((doc) =>
            products.push(Object.assign({ id: doc.id }, doc.data()))
          );
          const lastKey = snapshot.docs[snapshot.docs.length - 1];
          resolve({ products, lastKey });
        } catch (e) {
          reject(
            (e === null || e === void 0 ? void 0 : e.message) ||
              ":( Failed to fetch products."
          );
        }
      } else {
        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);
        try {
          const totalQuery = await db.collection("products").get();
          const total = totalQuery.docs.length;
          const query = db
            .collection("products")
            .orderBy(firebase.firestore.FieldPath.documentId())
            .limit(12);
          const snapshot = await query.get();
          clearTimeout(timeout);
          if (!didTimeout) {
            const products = [];
            snapshot.forEach((doc) =>
              products.push(Object.assign({ id: doc.id }, doc.data()))
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];
            resolve({ products, lastKey, total });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(
            (e === null || e === void 0 ? void 0 : e.message) ||
              ":( Failed to fetch products."
          );
        }
      }
    })();
  });
};

export const searchBlog = (searchKey) => {
  let didTimeout = false;
  return new Promise((resolve, reject) => {
    (async () => {
      const productsRef = db.collection("products");
      const timeout = setTimeout(() => {
        didTimeout = true;
        reject(new Error("Request timeout, please try again"));
      }, 15000);
      try {
        const searchedNameRef = productsRef
          .orderBy("name_lower")
          .where("name_lower", ">=", searchKey)
          .where("name_lower", "<=", `${searchKey}\uf8ff`)
          .limit(12);
        const searchedKeywordsRef = productsRef
          .orderBy("dateAdded", "desc")
          .where("keywords", "array-contains-any", searchKey.split(" "))
          .limit(12);
        // const totalResult = await totalQueryRef.get();
        const nameSnaps = await searchedNameRef.get();
        const keywordsSnaps = await searchedKeywordsRef.get();
        // const total = totalResult.docs.length;
        clearTimeout(timeout);
        if (!didTimeout) {
          const searchedNameProducts = [];
          const searchedKeywordsProducts = [];
          let lastKey = null;
          if (!nameSnaps.empty) {
            nameSnaps.forEach((doc) => {
              searchedNameProducts.push(
                Object.assign({ id: doc.id }, doc.data())
              );
            });
            lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
          }
          if (!keywordsSnaps.empty) {
            keywordsSnaps.forEach((doc) => {
              searchedKeywordsProducts.push(
                Object.assign({ id: doc.id }, doc.data())
              );
            });
          }
          // MERGE PRODUCTS
          const mergedProducts = [
            ...searchedNameProducts,
            ...searchedKeywordsProducts,
          ];
          const hash = {};
          mergedProducts.forEach((product) => {
            hash[product.id] = product;
          });
          resolve({ products: Object.values(hash), lastKey });
        }
      } catch (e) {
        if (didTimeout) return;
        reject(e);
      }
    })();
  });
};
