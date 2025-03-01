import React, { useEffect, useState } from 'react'

const Interests = ({ user, authUser }) => {
    const [interests, setInterests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        if (user) setInterests(user?.interests || []);
    }, [user?.firstName]);

    const handleInputChange = (e) => {
        setFormData({ name: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const interestToSave = formData.name;

        if (editingIndex !== null) {
            const updatedInterests = [...interests];
            updatedInterests[editingIndex] = interestToSave;
            setInterests(updatedInterests);
        } else {
            setInterests(prev => [...prev, interestToSave]);
        }

        setIsModalOpen(false);
        setFormData({ name: '' });
    };

    const handleEdit = (interest, index) => {
        setFormData({ name: interest });
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className="my-4">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg mb-2">Interests</h2>
                {authUser && (
                    <button
                        onClick={() => {
                            setFormData({ name: '' });
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {interests?.map((interest, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg relative group">
                        {authUser && (
                            <button
                                onClick={() => handleEdit(interest, index)}
                                className="absolute top-2 right-2 text-slate-600 hover:text-slate-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        )}
                        <h3 className="text-sm font-semibold">{interest}</h3>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
                >
                    <div className="relative mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">
                            {editingIndex !== null ? 'Edit Interest' : 'Add Interest'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Interest Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    required
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
                                >
                                    {editingIndex !== null ? 'Save Changes' : 'Add Interest'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Interests
