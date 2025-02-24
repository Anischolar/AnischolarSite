import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import ResumeService from '../../service/ResumeService';
import ResumeCardItem from './components/ResumeCardItem';
import { useAuth } from '../../authProvider';
import Header from '../../components/Header';

function Resumes() {
  const { user } = useAuth();
  const [created, setIsCreated] = useState(false);
  console.log(user);

  const [resumeList, setResumeList] = useState([]); // Ensure resumeList is initialized as an empty array

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  useEffect(() => {
    GetResumesList();
  },[created])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    ResumeService.GetUserResumes(user?.email)
      .then(resp => {
        console.log('Resume List:', resp.data.data);
        setResumeList(resp.data || []);
      })
      .catch(error => {
        console.error("Failed to fetch resumes:", error);
        setResumeList([]); // Fallback in case of error
      });
  }
  console.log(resumeList);
  

  return (
    <>
      <Header title="User Data" title2="" />
      <div className='p-10 md:px-20 lg:px-16 mt-20'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Kickstart your CV creation with AI assistance to secure your next dream internship / job!</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
          <AddResume created={created} setIsCreated={setIsCreated}/>
          {resumeList.length > 0 && (
            resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          ) }
        </div>
      </div>
    </>
  );
}

export default Resumes;
