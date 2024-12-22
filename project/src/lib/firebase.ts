import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBsw4GkqRyEgVoTEakJG2AqAbiHrpZL6XI",
  authDomain: "pedidos-nf.firebaseapp.com",
  projectId: "pedidos-nf",
  storageBucket: "pedidos-nf.firebasestorage.app",
  messagingSenderId: "306369564226",
  appId: "1:306369564226:web:2aaca10e09376bc57b67db"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google provider with custom parameters
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always prompt for account selection
});