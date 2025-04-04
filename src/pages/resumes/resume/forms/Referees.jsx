
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

function Referees() {
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { cvContent, setCvContent } = useAuth();

    // Initialize certificatesList from resumeInfo or with a default structure
    const [refereesList, setRefereesList] = useState(
        cvContent?.referees || [
            {
                name: '',
                position: '',
                company: '',
                phone: '',
                email: '',
            }
        ]
    );

    // Populate certificatesList with resumeInfo data if it exists
    useEffect(() => {
        if (cvContent?.referees) {
            setRefereesList(cvContent.referees);
        }
    }, [cvContent]);

    const handleChange = (index, name, value) => {
        const newEntries = refereesList.slice();
        newEntries[index][name] = value;
        setRefereesList(newEntries);
    };

    const AddNewReferees= () => {
        setRefereesList([
            ...refereesList,
            {
                name: '',
                position: '',
                company: '',
                phone: '',
                email: '',
            }
        ]);
    };

    const RemoveReferees = () => {
        if (refereesList.length > 0) {
            setRefereesList(refereesList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                referees: refereesList.map(({ id, ...rest }) => rest)
            }
        };

        ResumeService.UpdateResumeDetail(resumeId, data.data)
            .then(
                (resp) => {
                    setLoading(false);
                    toast.success('Referees updated!');
                    setCvContent({
                        ...cvContent,
                        referees: refereesList
                    });
                },
                (error) => {
                    setLoading(false);
                    toast('Server Error, Try again!');
                }
            );
    };

    return (
        <div className='p-3 lg:p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Referees</h2>
            <p>Add Your Referees <span>{'(only when asked for in the job description)'}</span></p>

            <div>
                {refereesList.map((item, index) => (
                    <div key={index} className='flex flex-col justify-between mb-2 border rounded-lg p-3'>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='mr-2'>
                                <label className='text-xs'>Name</label>
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

                        <div className='flex flex-col lg:flex-row'>
                            <div className='mr-2'>
                                <label className='text-xs'>Position</label>
                                <Input
                                    className="w-full"
                                    value={item.position}
                                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Phone</label>
                                <Input
                                    className="w-full"
                                    value={item.phone}
                                    onChange={(e) => handleChange(index, 'phone', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className='text-xs'>Email</label>
                            <Input
                                className="w-full"
                                value={item.email}
                                onChange={(e) => handleChange(index, 'email', e.target.value)}
                            />
                        </div>

                    </div>
                ))}
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewReferees} className="text-primary">
                        + Add More Referees
                    </Button>
                    <Button variant="outline" onClick={RemoveReferees} className="text-primary">
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} style={{marginTop: '4px'}} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Referees;
