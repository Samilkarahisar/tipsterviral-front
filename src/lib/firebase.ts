import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebase = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  getAnalytics();
}

export const auth = getAuth(firebase);

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const authWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch {
    return;
  }
};
export const authWithTwitter = async () => {
  try {
    await signInWithPopup(auth, twitterProvider);
  } catch {
    return;
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    return err.code;
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    return err.code;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    return err.code;
  }
};
