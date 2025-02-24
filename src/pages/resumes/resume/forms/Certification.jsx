
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuth } from '../../../../authProvider'
import ResumeService from '../../../../service/ResumeService'
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore'
import { db } from '../../../../Config/firebase.config'

function Certification() {
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { user, cvContent, setCvContent } = useAuth();

    // Initialize certificatesList from resumeInfo or with a default structure
    const [certificatesList, setCertificatesList] = useState(
        cvContent?.certificates || [
            {
                name: '',
                company: '',
                link: '',
                desc: '',
                issueDate: ''
            }
        ]
    );

    // Populate certificatesList with resumeInfo data if it exists
    useEffect(() => {
        if (cvContent?.certificates) {
            setCertificatesList(cvContent.certificates);
        }
    }, [cvContent]);

    const handleChange = (index, name, value) => {
        const newEntries = certificatesList.slice();
        newEntries[index][name] = value;
        setCertificatesList(newEntries);
    };

    const AddNewCertificates = () => {
        setCertificatesList([
            ...certificatesList,
            {
                name: '',
                company: '',
                link: '',
                desc: '',
                issueDate: ''
            }
        ]);
    };

    const RemoveCertificates = () => {
        if (certificatesList.length > 1) {
            setCertificatesList(certificatesList.slice(0, -1));
        }
    };

    const onSave = async () => {
        const userId = user?.uid;
        setLoading(true);
        const data = {
            data: {
                certificates: certificatesList.map(({ id, ...rest }) => rest)
            }
        };


        try {
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                // Update the document with the new about info
                await updateDoc(docRef, { certificates: certificatesList });
            } else {
                console.log("No document found with the specified userId.");
            }

            // Update resumeInfo context only after saving
            setCvContent({
                ...cvContent,
                certificates: certificatesList
            });

            await ResumeService.UpdateResumeDetail(resumeId, data.data)
            toast.success('Certifications updated!');

        } catch (error) {
            console.error('Error updating certifications:', error);
            toast.error('Error updating certifications');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-3 lg:p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Certificates</h2>
            <p>Add Your Certificates</p>

            <div>
                {certificatesList.map((item, index) => (
                    <div key={index} className='flex flex-col justify-between mb-2 border rounded-lg p-3'>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='mr-2'>
                                <label className='text-xs'>Certificate Name</label>
                                <Input
                                    className="w-full"
                                    value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Company</label>
                                <Input
                                    className="w-full"
                                    value={item.company}
                                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className='text-xs'>Link to Certificate</label>
                            <Input
                                className="w-full"
                                value={item.link}
                                onChange={(e) => handleChange(index, 'link', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>Brief Decription</label>
                            <Input
                                className="w-full"
                                value={item.desc}
                                onChange={(e) => handleChange(index, 'desc', e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Issue Date</label>
                            <Input
                                type="date"
                                name="issueDate"
                                onChange={(e) => handleChange(e, index)}
                                value={item.issueDate}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewCertificates} className="text-primary">
                        + Add More Certificate
                    </Button>
                    <Button variant="outline" onClick={RemoveCertificates} className="text-primary">
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} style={{ marginTop: '4px' }} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Certification;
