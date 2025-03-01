import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config/firebase.config';

const Skills = ({ user, authUser }) => {
    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        proficiency: 'Intermediate',
        yearsOfExperience: '',
        lastUsed: '',
        currentlyUsing: false
    });

    const proficiencyLevels = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert'
    ];

    useEffect(() => {
        if (user) setSkills(user?.skills || []);
    }, [user?.firstName]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const skillToSave = { ...formData };

        let newSkills;
        if (editingIndex !== null) {
            newSkills = [...skills];
            newSkills[editingIndex] = skillToSave;
        } else {
            newSkills = [...skills, skillToSave];
        }

        setIsLoading(true);

        // Save the new skills to the database
        try {
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", authUser?.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { skills: newSkills });

                setSkills(newSkills);
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    proficiency: 'Intermediate',
                    yearsOfExperience: '',
                    lastUsed: '',
                    currentlyUsing: false
                });
                alert("Skills saved successfully");
            } else {
                alert("No user document found!");
            }
        } catch (error) {
            console.error("Error saving skills:", error);
            alert("Failed to save skills. Please try again.");
        } finally {
            setIsLoading(false);
        }
        
    };

    const handleEdit = (skill, index) => {
        setFormData(skill);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className="my-4">
            <div className='flex justify-between items-center'>
                <h2 className="font-bold text-lg mb-2">Skills</h2>
                {authUser && (
                    <button
                        onClick={() => {
                            setFormData({
                                name: '',
                                proficiency: 'Intermediate',
                                yearsOfExperience: '',
                                lastUsed: '',
                                currentlyUsing: false
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills?.map((skill, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg relative group">
                        {authUser && (
                            <button
                                onClick={() => handleEdit(skill, index)}
                                className="absolute top-2 right-2 text-slate-600 hover:text-slate-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        )}
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold">{skill.name}</h3>
                            <span className="text-xs bg-slate-200 px-2 py-1 rounded-full">
                                {skill.proficiency}
                            </span>
                        </div>
                        {(skill.yearsOfExperience || skill.lastUsed) && (
                            <div className="mt-2 text-xs text-gray-600">
                                {skill.yearsOfExperience && (
                                    <p>Experience: {skill.yearsOfExperience} years</p>
                                )}
                                {skill.lastUsed && (
                                    <p>Last used: {skill.lastUsed}</p>
                                )}
                                {skill.currentlyUsing && (
                                    <p className="text-green-600">Currently using</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
                >
                    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">
                            {editingIndex !== null ? 'Edit Skill' : 'Add Skill'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Skill Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Proficiency Level *</label>
                                    <select
                                        name="proficiency"
                                        value={formData.proficiency}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    >
                                        {proficiencyLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                    <input
                                        type="number"
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        min="0"
                                        step="0.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Used</label>
                                    <input
                                        type="date"
                                        name="lastUsed"
                                        value={formData.lastUsed}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="currentlyUsing"
                                    checked={formData.currentlyUsing}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-gray-300 text-slate-800 focus:ring-slate-800"
                                />
                                <label className="ml-2 text-sm text-gray-700">Currently using this skill</label>
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
                                        (editingIndex !== null ? 'Save Changes' : 'Add Skill')
                                    }
                                
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Skills