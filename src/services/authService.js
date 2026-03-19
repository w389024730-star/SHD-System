import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ref, set, get, serverTimestamp } from "firebase/database";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if user exists in database
  const userRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(userRef);

  if (!snapshot.exists()) {
    // First time login - create user record (pending authorization)
    await set(userRef, {
      email: user.email,
      displayName: user.displayName,
      role: "pending",
      brands: {},
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  } else {
    // Update last login time
    await set(ref(db, `users/${user.uid}/lastLogin`), serverTimestamp());
  }

  return user;
}

export async function logOut() {
  await signOut(auth);
}

export function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}