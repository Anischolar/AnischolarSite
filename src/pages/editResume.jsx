import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../resume/FormSection';
import Template1 from '../components/templateComponents/Template1';
import Header from '../components/Header';
import Template4 from '../components/templateComponents/Template4';
import Template2 from '../components/templateComponents/Template2';
import Template3 from '../components/templateComponents/Template3';
import { useAuth } from '../authProvider';
import { db } from "../Config/firebase.config";
import { updateDoc, query, where, getDocs, collection, doc } from "firebase/firestore";


function EditResume() {
  const { user, cvContent, setCvContent, template } = useAuth();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    const userId = user?.uid;
    const fetchUserData = async () => {
      try {
        const userDataRef = collection(db, "userData");
        const q = query(userDataRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setCvContent({ id: doc.id, ...doc.data() });
          // navigate("/templates"); 
        } else {
          console.log("No user data found for the specified userId.");
          setCvContent(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [user?.uid]);

  // useEffect(()=>{

  //     GetResumeInfo();
  // },[])


  // const GetResumeInfo=()=>{
  //     ResumeService.GetResumeById(resumeId).then(resp=>{
  //       console.log(resp.data.data);
  //       setResumeInfo(resp.data.data);
  //     })
  // }

  return (
    <>
      <Header title="User Data" title2="" />
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
        <FormSection
          cvData={cvContent}
          setCvContent={setCvContent}
        />
        {/* Preview Section  */}
        {template && template === "Template 1" ?
          <Template1
            cvData={cvContent}
            setCvContent={setCvContent}
          /> : template === "Template 2" ?
            <Template2
              cvData={cvContent}
              setCvContent={setCvContent}
            />
            : template === "Template 3" ?
              <Template3
                cvData={cvContent}
                setCvContent={setCvContent}
              /> :
              <Template4
                cvData={cvContent}
                setCvContent={setCvContent}
              />
        }
      </div>
    </>
  )
}

export default EditResume