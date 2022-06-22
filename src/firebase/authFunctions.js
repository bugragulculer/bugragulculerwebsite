import { firebase, db, auth } from "./";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// -------------------------- v9 Versions ------------------------------

// Create Account on Authentication
export const createAccount = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Sign-in to an Account on Authentication
export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign-in to an Account with Google on Authentication
export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

// Sign-out from Authentication
export const signingOut = () => signOut(auth);

// Reset password of a profile
export const passwordReset = (email) => sendPasswordResetEmail(auth, email);

// Add user when new signup is performed to the Firebase Database

//export const addUser = (id, user) => db.collection("users").doc(id).set(user);
export const addUser = async (id, user) => setDoc(doc(db, "users", id), user);

// Get user details from Firebase Database
//export const getUser = (id) => db.collection("users").doc(id).get();
export const getUser = async (id) => getDoc(doc(db, "users", id));

// Update Password on Authentication
export const passwordUpdate = (password) =>
  updatePassword(auth.currentUser, password);

// Update Profile on Firebase Database
export const updateProfile = (id, updates) =>
  updateDoc(doc(db, "users", id), updates);

// Save basket items to the account on Firebase Database
export const saveBasketItems = (items, userId) =>
  updateDoc(doc(db, "users", userId), {
    basket: items,
  });

// Set Authentication persistence on local machine
export const setAuthPersistence = () =>
  setPersistence(auth.firebase.auth.Auth.Persistence.LOCAL);

export const reauthenticate = (currentPassword) => {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return reauthenticateWithCredential(user, credential);
};

// Update email on Authentication
export const updateEmail = (currentPassword, newEmail) =>
  new Promise((resolve, reject) => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        updateEmail(user, newEmail)
          .then(() => {
            resolve("Email Successfully updated");
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

// Change Password on Authentication
export const changePassword = (currentPassword, newPassword) =>
  new Promise((resolve, reject) => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        updatePassword(user, newPassword)
          .then(() => {
            resolve("Password updated successfully!");
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

// Check if auth state changed
export const onAuthStateChanged = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Auth State Changed failed"));
      }
    });
  });

// -------------------------- v8 Versions ------------------------------
