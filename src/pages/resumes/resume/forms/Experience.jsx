
import React, { useContext, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuth } from '../../../../authProvider'
import ResumeService from '../../../../service/ResumeService'
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore'
import { db } from '../../../../Config/firebase.config'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
}

function Experience() {
    const { user, cvContent, setCvContent } = useAuth();
    const params = useParams();
    const [experinceList, setExperinceList] = useState(cvContent?.experience || []); // Initialize directly from resumeInfo
    const [loading, setLoading] = useState(false);

    const handleChange = (index, event) => {
        const newEntries = experinceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
        console.log(experinceList);
    }

    const AddNewExperience = () => {
        setExperinceList([...experinceList, { ...formField }]);
    }

    const RemoveExperience = () => {
        setExperinceList(experinceList => experinceList.slice(0, -1));
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experinceList.slice();
        newEntries[index][name] = e.target.value;
        setExperinceList(newEntries);
        console.log(experinceList);

    }

    const onSave = async () => {

        const userId = user?.uid;
        console.log(user);
        
        setLoading(true);
        const data = {
            data: {
                experience: experinceList.map(({ id, ...rest }) => rest)
            }
        };

        try {
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                // Update the document with the new about info
                await updateDoc(docRef, { experience: experinceList });
            } else {
                console.log("No document found with the specified userId.");
            }

            // Update resumeInfo in context
            setCvContent((prevInfo) => ({
                ...prevInfo,
                experience: experinceList
            }));

            await ResumeService.UpdateResumeDetail(params?.resumeId, data.data);
            toast.success("Experience updated");

        } catch (error) {
            console.error("Error saving experience:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experinceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    {/* Work Summary */}
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummery}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
                                        item={item}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Experience;
