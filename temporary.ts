import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

async function testFirestore() {
  try {
    const docRef = doc(db, "courses", "crypto_basics"); // Replace with a valid courseId
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Firestore Document Data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error accessing Firestore:", error);
  }
}

testFirestore();
