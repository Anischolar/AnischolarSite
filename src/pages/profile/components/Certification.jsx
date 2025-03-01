import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config/firebase.config';

const Certification = ({ user, authUser }) => {
    const [certificates, setCertificates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        issueDate: '',
        expirationDate: '',
        doesNotExpire: false
    });

    useEffect(() => {
        if (user) setCertificates(user?.certificates || []);
    }, [user?.firstName]);

    console.log(certificates);
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'doesNotExpire') {
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                expirationDate: checked ? '' : prev.expirationDate
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
        const certificationToSave = { ...formData };

        let newCertificates;
        if (editingIndex !== null) {
            newCertificates = [...certificates];
            newCertificates[editingIndex] = certificationToSave;
        } else {
            newCertificates = [...certificates, certificationToSave];
        }

        setIsLoading(true);
        try {
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", authUser?.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { certificates: newCertificates });

                setCertificates(newCertificates);
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    link: '',
                    issueDate: '',
                    expirationDate: '',
                    doesNotExpire: false
                });
                alert("Certificates saved successfully");
            } else {
                alert("No user document found!");
            }
        } catch (error) {
            console.error("Error saving certificate:", error);
            alert("Failed to save certificate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (cert, index) => {
        setFormData(cert);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    return (
        <div className='gap-3 my-4'>
            <div className='flex items-center justify-between'>
                <h2 className="font-bold text-lg mb-2">Certifications</h2>
                {authUser && (
                    <button
                        onClick={() => {
                            setFormData({
                                name: '',
                                link: '',
                                issueDate: '',
                                expirationDate: '',
                                doesNotExpire: false
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

            {certificates?.map((cert, index) => (
                <div key={index} className='flex items-center justify-between relative group my-4'>

                    <div className='flex items-center justify-between w-full'>
                        <div>
                            <div className='flex flex-row'>
                                <h2 className='text-sm font-semibold'>{cert.name}</h2>
                                {authUser && (
                                    <button
                                        onClick={() => handleEdit(cert, index)}
                                        className="ml-2 text-slate-600 hover:text-slate-800"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {cert.issueDate && (
                                <p className='text-xs text-gray-500'>
                                    Issued: {cert.issueDate}{cert.expirationDate && ` - Expires: ${cert.expirationDate}`}
                                </p>
                            )}
                        </div>
                        <a
                            href={cert.link}
                            className="text-sm text-blue-500 hover:text-blue-700 break-all max-w-[60%] text-right"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Credential
                        </a>
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
                >
                    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">
                            {editingIndex !== null ? 'Edit Certification' : 'Add Certification'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Certification Name *</label>
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
                                    <label className="block text-sm font-medium text-gray-700">Credential URL *</label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                                    <input
                                        type="date"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        disabled={formData.doesNotExpire}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="doesNotExpire"
                                    checked={formData.doesNotExpire}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-gray-300 text-slate-800 focus:ring-slate-800"
                                />
                                <label className="ml-2 text-sm text-gray-700">This credential does not expire</label>
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
                                        (editingIndex !== null ? 'Save Changes' : 'Add Certification')
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

export default Certification