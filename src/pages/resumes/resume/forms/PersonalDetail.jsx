import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../../../authProvider';
import ResumeService from '../../../../service/ResumeService';

function PersonalDetail({ enabledNext }) {
    const { user, cvContent, setCvContent, template } = useAuth();
    const params = useParams();

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

   // Set initial form data when cvContent is available
//    useEffect(() => {
//     if (cvContent) {
//         setFormData({
//             name: cvContent?.personalDetails?.name || '',
//             jobTitle: cvContent?.title || '',
//             address: cvContent?.personalDetails?.address || '',
//             phone: cvContent?.personalDetails?.phone || '',
//             email: cvContent?.personalDetails?.email || '',
//         });
//     }
// }, [cvContent]);

const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update local formData state
    setFormData({
        ...formData,
        [name]: value,
    });

    // Update cvContent with updated personalDetails while preserving other properties
    setCvContent({
        ...cvContent,
        personalDetails: {
            ...cvContent.personalDetails,
            [name]: value,
        },
    });
};

    

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            personalDetails: cvContent?.personalDetails
        }
        console.log('formdata', data)
        ResumeService.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast.success("Details updated");
        }, (error) => {
            setLoading(false);
        })
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div className='col-span-2 lg:col-span-1'>
                        <label className='text-sm'>Full Name</label>
                        <Input name="name" defaultValue={cvContent?.personalDetails?.name} required onChange={handleInputChange} />
                    </div>
                    {/* <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" required onChange={handleInputChange} 
                        defaultValue={cvContent?.lastName} />
                    </div> */}
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" required 
                        defaultValue={cvContent?.title}
                        onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" required 
                        defaultValue={cvContent?.personalDetails?.address}
                        onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" required 
                        defaultValue={cvContent?.personalDetails?.phone}
                        onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <label className='text-sm'>Email</label>
                        <Input name="email" required 
                        defaultValue={cvContent?.personalDetails?.email}
                        onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-3 flex lg:justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default PersonalDetail
