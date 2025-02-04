import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config/firebase.config';
import { LoaderCircle } from 'lucide-react';


const About = ({ user, authUser, onUpdate }) => {
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutInput, setAboutInput] = useState(user?.about || "");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if(user){
      setAboutInput(user?.about || "");
    }
    
  }, [user?.firstName])

  async function updateAbout() {
    setIsLoading(true);
    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", authUser?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        // Update the document with the new about info
        await updateDoc(docRef, { about: aboutInput });
        setIsLoading(false);
        alert("updated successfully!");
      } else {
        console.log("No document found with the specified userId.");
      }
    } catch (error) {
      console.log(error);
      
    }

    setEditingAbout(false);
  }

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">About</h2>
        {authUser && (
          !editingAbout ? (
            <button
              className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => setEditingAbout(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                onClick={() => {
                  setEditingAbout(false);
                  setAboutInput(aboutInput || "");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <button
                className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                onClick={updateAbout}
              >
                 {loading ? <LoaderCircle className='animate-spin' /> : 
                    (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 448 512">
                      <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>)}
              </button>
            </div>
          )
        )}
      </div>
      {!editingAbout ? (
        <p className="text-gray-600 mt-2">{aboutInput || "No information provided."}</p>
      ) : (
        <input
          type="text"
          className="w-full mt-2 border border-gray-300 rounded-md p-2"
          value={aboutInput}
          onChange={(e) => setAboutInput(e.target.value)}
          placeholder="Write something about yourself..."
        />
      )}
    </div>

  )
}

export default About
