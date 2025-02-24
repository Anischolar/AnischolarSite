import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Template1 from '../components/templateComponents/Template1';
import { dummyCV } from '../Config/constants';
import UpdateForm from '../components/templateComponents/UpdateForm';
import Template2 from '../components/templateComponents/Template2';
import Template3 from '../components/templateComponents/Template3';
import Swal from "sweetalert2";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useAuth } from '../authProvider';
import { db } from "../Config/firebase.config";
import { updateDoc, query, where, getDocs, collection, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Template4 from '../components/templateComponents/Template4';
import Template5 from '../components/templateComponents/Template5';
import ResumeService from '../service/ResumeService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './resumes/resume/ui/button';
import { RWebShare } from 'react-web-share'
import TemplateSelect from './templateSelect';


const CVPreview = () => {
    const { user, cvContent, setCvContent, template } = useAuth();
    const [isFormVisible, setIsFormVisible] = useState(false); // Step 1: State for visibility
    const [isEditing, setIsEditing] = useState(false);
    const { resumeId } = useParams();
    const navigate = useNavigate();


    const HandleDownload = () => {
        window.print();
    }

    useEffect(() => {

        GetResumeInfo();
    }, [])


    const GetResumeInfo = () => {
        ResumeService.GetResumeById(resumeId).then(resp => {
            console.log(resp.data);
            setCvContent(resp.data);
        })
    }


    const handleEdit = () => {
        navigate(`/resumes/resume/${resumeId}/edit`);
    };




    return (
        <>
            <div id='no-print'>
                <Header title="User Data" title2="" />
                {cvContent &&
                    <div className='mt-24 mx-14'>
                        <h2 className='text-center text-2xl font-medium'>
                            Congratulations! Your ultimate resume is ready to download! </h2>
                        <p className='text-center text-gray-400'>Download and Share your unique resume URL with recruiters effortlessly. </p>
                        <div className='flex justify-between my-10'>
                            <Button onClick={handleEdit} >Edit</Button>
                            <Button onClick={HandleDownload}>Download</Button>
                        </div>
                    </div>
                }
            </div>
            <div className='flex justify-around'>
                <div id='no-print'>
                    <TemplateSelect />
                </div>
                <div id='print-area' className='w-full md:w-[794px] lg:w-[794px] '>
                    {template && template === "Template 1" ?
                        <Template1
                            cvData={cvContent}
                            setCvContent={setCvContent}
                            isEditing={isEditing}
                        /> : template === "Template 2" ?
                            <Template2
                                cvData={cvContent}
                                setCvContent={setCvContent}
                                isEditing={isEditing}
                            />
                            : template === "Template 3" ?
                                <Template3
                                    cvData={cvContent}
                                    setCvContent={setCvContent}
                                    isEditing={isEditing}
                                />
                                : template === "Template 4" ?
                                    <Template4
                                        cvData={cvContent}
                                        setCvContent={setCvContent}
                                        isEditing={isEditing}
                                    /> :
                                    <Template5
                                        cvData={cvContent}
                                        setCvContent={setCvContent}

                                    />
                    }

                </div>
            </div>
        </>
    );
};

export default CVPreview;
