
import { db } from "../Config/firebase.config";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

// Firestore collections reference
const resumeCollectioPath = "user-resumes";
const resumesCollection = collection(db, resumeCollectioPath);

// Create a new resume
const CreateNewResume = async (data) => {
    try {
        const docRef = await addDoc(resumesCollection, data.data);
        return { data: { data: { documentId: docRef.id } } };
    } catch (error) {
        console.error("Error creating new resume:", error);
        throw error;
    }
};

const GetUserResumes = async (userEmail) => {
    try {
        const q = query(resumesCollection, where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const resumes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return { data: resumes };
    } catch (error) {
        console.error("Error fetching resumes:", error);
        throw error;
    }
};


// Update resume details by "resumeId" field
const UpdateResumeDetail = async (id, data) => {
    try {
        // Query the collection to find the document with the given "resumeId"
        const q = query(resumesCollection, where("resumeId", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming only one document matches
            const docRef = querySnapshot.docs[0].ref;

            // Update the document
            await updateDoc(docRef, data);
            return { data: "Resume updated successfully" };
        } else {
            console.error("No resume found with resumeId:", id);
            throw new Error("Resume not found");
        }
    } catch (error) {
        console.error("Error updating resume:", error);
        throw error;
    }
};


// Get resume by "resumeId" field
const GetResumeById = async (id) => {
    try {
        const q = query(resumesCollection, where("resumeId", "==", id)); // Query by "resumeId"
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming only one document matches
            const doc = querySnapshot.docs[0];
            return { data: { id: doc.id, ...doc.data() } };
        } else {
            console.error("No resume found with resumeId:", id);
            throw new Error("Resume not found");
        }
    } catch (error) {
        console.error("Error fetching resume by resumeId:", error);
        throw error;
    }
};



// Delete resume by ID
const DeleteResumeById = async (id) => {
    const docRef = doc(db, resumeCollectioPath, id);
    await deleteDoc(docRef);
    return { data: "Resume deleted successfully" };
};

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
};
