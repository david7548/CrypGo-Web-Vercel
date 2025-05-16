// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore for courses db
import { getStorage } from "firebase/storage"; // Storage for profile pics & media

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZycXlg6C04aQvwUVEQ8bTVlnMzSln_UA", // Move this to an env file for security
  authDomain: "crypgo-web-app.firebasestorage.app",
  projectId: "crypgo-web-app",
  storageBucket: "crypgo-web-app.firebasestorage.app",
  messagingSenderId: "804528767894",
  appId: "1:804528767894:web:33fe0e237366ea0238d3b7"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Correct way to initialize storage

// ✅ Export the initialized services
export { auth, db, storage };
export default app;