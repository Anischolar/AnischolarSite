import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../Config/firebase.config';

const ReadMore = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <span>
            {isReadMore ? (
                <span>{text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')}</span>
            ) : (
                <span>{text}</span>
            )}
            {text.length > maxLength && (
                <span
                    onClick={toggleReadMore}
                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                >
                    {isReadMore ? 'Read More' : 'Show Less'}
                </span>
            )}
        </span>
    );
};

const Education = ({ user, authUser }) => {
    const [educationList, setEducationList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        currentlyStudying: false,
        description: ''
    });

    useEffect(() => {
        if (user) setEducationList(user?.education || []);
    }, [user?.firstName]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'currentlyStudying') {
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                endDate: checked ? '' : prev.endDate
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const educationToSave = { ...formData };

        let newEducationList;
        if (editingIndex !== null) {
            newEducationList = [...educationList];
            newEducationList[editingIndex] = educationToSave;
        } else {
            newEducationList = [...educationList, educationToSave];
        }

        setIsLoading(true);
        try {
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", authUser?.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { education: newEducationList });

                setEducationList(newEducationList);
                setIsModalOpen(false);
                setFormData({
                    universityName: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    currentlyStudying: false,
                    description: ''
                });
                alert("Education saved successfully");
            } else {
                alert("No user document found!");
            }
        } catch (error) {
            console.error("Error saving education:", error);
            alert("Failed to save education. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (education, index) => {
        setFormData(education);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className='my-6'>
            <div className='flex items-center justify-between'>
                <h2 className="font-bold text-lg mb-2">Education</h2>
                {authUser && (
                    <button
                        onClick={() => {
                            setFormData({
                                universityName: '',
                                degree: '',
                                major: '',
                                startDate: '',
                                endDate: '',
                                currentlyStudying: false,
                                description: ''
                            });
                            setEditingIndex(null);
                            setIsModalOpen(true);
                        }}
                        className="rounded-full bg-gray-200 p-2 border border-gray-300 text-gray-700 shadow hover:bg-gray-300 active:bg-gray-400 focus:ring focus:ring-gray-400/50 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {educationList?.map((education, index) => (
                <div key={index} className='my-4 relative group'>
                    {authUser && (
                        <button
                            onClick={() => handleEdit(education, index)}
                            className="absolute right-0 top-0 text-slate-600 hover:text-slate-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    )}
                    <h2 className='text-sm font-bold'>{education.universityName}</h2>
                    <h2 className='text-xs'>{education?.degree} in {education?.major}</h2>
                    <div className='text-xs my-2 w-full lg:w-3/4'>
                        <ReadMore text={education?.description || ''} maxLength={100} />
                    </div>
                    <span className='text-xs'>
                        {education?.startDate} - {education?.currentlyStudying ? 'Present' : education.endDate}
                    </span>
                    <hr className='mt-3' style={{ borderColor: 'grey' }} />
                </div>
            ))}

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
                >
                    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">
                            {editingIndex !== null ? 'Edit Education' : 'Add Education'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">University Name *</label>
                                    <input
                                        type="text"
                                        name="universityName"
                                        value={formData.universityName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Degree *</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Major</label>
                                    <input
                                        type="text"
                                        name="major"
                                        value={formData.major}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        disabled={formData.currentlyStudying}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="currentlyStudying"
                                    checked={formData.currentlyStudying}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-gray-300 text-slate-800 focus:ring-slate-800"
                                />
                                <label className="ml-2 text-sm text-gray-700">Currently Studying Here</label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 h-32"
                                    placeholder="Describe your educational experience..."
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' :
                                        (editingIndex !== null ? 'Save Changes' : 'Add Education')
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Education;