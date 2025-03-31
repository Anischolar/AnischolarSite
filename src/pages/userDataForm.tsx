import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { getDocs, query, where, addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import { db } from "../Config/firebase.config";
import Swal from "sweetalert2";
import { API_KEY } from '../Config/constants';
import { useAuth } from '../authProvider';

const sectors = [
    { name: "Agriculture", icon: "🌾" },
    { name: "Business", icon: "💼" },
    { name: "Technology", icon: "💻" },
    { name: "Engineering", icon: "⚙️" },
    { name: "Education", icon: "📚" },
    { name: "Healthcare", icon: "🩺" },
    { name: "Arts", icon: "🎨" },
    { name: "Sports", icon: "⚽" },
    { name: "Science", icon: "🔬" },
    { name: "Environment", icon: "🌍" },
    { name: "Media", icon: "🎥" },
    { name: "Hospitality", icon: "🏨" },
    { name: "Transportation", icon: "🚗" },
    { name: "Energy", icon: "⚡" },
    { name: "Real Estate", icon: "🏠" },
    { name: "Law", icon: "⚖️" },
    { name: "Public Services", icon: "🏛️" },
]

const MultiStepForm: React.FC = () => {
    const { user, cvContent, setCvContent } = useAuth();
    console.log(user);

    const navigate = useNavigate();
    const location = useLocation();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    interface FormData {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        company: string;
        title: string;
        address: string;
        gender: string;
        dob: string;
        interests: string[];
        educationLevel: string;
        graduationDate: string;
        motivations: string[];
    }

    const [formData, setFormData] = useState<FormData>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        title: '',
        address: '',
        gender: '',
        dob: '',
        interests: [],
        educationLevel: '',
        graduationDate: '',
        motivations: [],
    });


    useEffect(() => {
        if (user?.email) {
            setFormData((prev) => ({
                ...prev,
                email: user.email,
            }));
        }
    }, [user?.email]);

    useEffect(() => {
        const userId = user?.uid;
        const fetchUserData = async () => {
            try {
                const companyRef = collection(db, "companies");
                const q = query(companyRef, where("uid", "==", userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    navigate("/industry")
                } else {
                    console.log("No user data found for the specified userId.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();

    }, [user?.uid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleInterestChange = (sectorName: string) => {
        setFormData((prev) => {
            const isAlreadySelected = prev.interests.includes(sectorName);

            if (!isAlreadySelected && prev.interests.length < 3) {
                return { ...prev, interests: [...prev.interests, sectorName] };
            } else if (isAlreadySelected) {
                return { ...prev, interests: prev.interests.filter((interest) => interest !== sectorName) };
            }
            return prev;
        });
    };

    const handleMotivationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            const isAlreadySelected = prev.motivations.includes(e.target.value);

            if (!isAlreadySelected) {
                return { ...prev, motivations: [...prev.motivations, e.target.value] };
            } else if (isAlreadySelected) {
                return { ...prev, motivations: prev.motivations.filter((motivation) => motivation !== e.target.value) };
            }
            return prev;
        })
    }


    const handleEducationLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            educationLevel: e.target.value,
        }));
    };

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 4)); // Limit to max steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1)); // Limit to min step
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation: Check for empty required fields
        const { firstName, lastName, email, phoneNumber, interests, educationLevel, motivations } = formData;

        if (!firstName || !lastName || !email || !phoneNumber || interests.length === 0 || !educationLevel || motivations.length === 0) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please fill out all required fields",
                showConfirmButton: false,
                timer: 2000,
            });
            setIsLoading(false);
            return;
        }

        try {
            // Check if the user data already exists in Firestore
            const userId = user?.uid;
            const userDataRef = collection(db, "userData");
            const q = query(userDataRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Document exists, so update it
                const docId = querySnapshot.docs[0].id;
                await updateDoc(doc(db, "userData", docId), {
                    ...formData,
                    userId: user?.uid,
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Data updated successfully",
                    showConfirmButton: false,
                    timer: 1000,
                });
            } else {
                // Document does not exist, so create a new one
                await addDoc(collection(db, "userData"), {
                    ...formData,
                    userId: user?.uid,
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Data saved successfully",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }

            navigate("/");
        } catch (error) {
            console.error("Error submitting application:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Application failed, try again",
                showConfirmButton: false,
                timer: 1000,
            });
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const userId = user?.uid;
        const fetchUserData = async () => {
            try {
                const userDataRef = collection(db, "userData");
                const q = query(userDataRef, where("userId", "==", userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setFormData((prev) => ({
                        ...prev,
                        ...doc.data(),
                        id: doc.id,
                    }));
                    navigate("/");
                } else {
                    console.log("No user data found for the specified userId.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [user?.uid]);


    return (
        <div>
            <Header title="User Data" title2="" />
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h1 className='fs-3 text-[#27ae60] pb-2'>Fill in your details</h1>
                                <p className='mb-4 border-bottom'>These will be used on your profile page</p>
                                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                                    <div className=''>
                                        <label htmlFor="firstName" className="formbold-form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="formbold-form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                                    <div>
                                        <label htmlFor="email" className="formbold-form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="formbold-form-input"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="formbold-form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                                    <div>
                                        <label htmlFor="company" className="formbold-form-label">
                                            Company/Institution
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title" className="formbold-form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="title"
                                            name="title"
                                            placeholder='eg. Student or Engineer'
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                                    <div>
                                        <label htmlFor="address" className="formbold-form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input w-full"
                                            id="address"
                                            name="address"
                                            placeholder='Kampala, Central Region, Uganda'
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                                    <div>
                                        <label htmlFor="gender" className="formbold-form-label">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            className="formbold-form-input"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="dob" className="formbold-form-label">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="formbold-form-input"
                                            id="dob"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="button" onClick={nextStep} className="formbold-btn">
                                    Next
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div>

                                <h1 className='fs-3 text-[#27ae60] pb-2'>Which sectors are you interested in ?</h1>
                                <p className='mb-4 border-bottom'>Tell us what interests you, and we will tailor your job, internships and courses.
                                    Select up to 3 </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {/* Checkbox Item */}
                                    {sectors.map((sector) => (
                                        <label
                                            key={sector.name}
                                            className={`flex items-center gap-3 p-2 w-48 bg-white border ${formData.interests.includes(sector.name) ? 'border-blue-500' : 'border-gray-300'
                                                } rounded-lg shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition`}
                                        >
                                            <span className="text-xl">{sector.icon}</span>
                                            <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-200"
                                                checked={formData.interests.includes(sector.name)}
                                                onChange={() => handleInterestChange(sector.name)}
                                            />
                                        </label>
                                    ))}

                                </div>

                                <div className="d-flex justify-content-between button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="button" onClick={nextStep} className="formbold-btn">
                                        Next
                                    </button>
                                </div>

                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h1 className='fs-3 text-[#27ae60] pb-2'>What is your education level</h1>
                                <p className='mb-4 border-bottom'>Help us customize alerts to match your experience, Pick one level that best fits you </p>
                                <div>
                                    <div className="">
                                        {[
                                            { name: "Fresher", desc: "0-1 years at university" },
                                            { name: "Second Year", desc: "Year 2 at university" },
                                            { name: "Third Year", desc: "Year 3 at university" },
                                            { name: "Fourth Year", desc: "Year 4 at university" },
                                            { name: "Finalist", desc: "Students in final year" },
                                            { name: "Graduate", desc: "Students who have recently graduated" },
                                        ].map((level) => (
                                            <label
                                                key={level.name}
                                                className="flex items-center justify-between gap-3 p-3 mb-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md transition"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">{level.name}</span>
                                                    <span className="text-sm font-medium text-gray-700">{level.desc}</span>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="educationLevel"
                                                    value={level.name}
                                                    checked={formData.educationLevel === level.name}
                                                    onChange={handleEducationLevelChange}
                                                    className="form-radio h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-200"
                                                />
                                            </label>
                                        ))}

                                    </div>

                                    <div className="formbold-input-flex">
                                        <div>
                                            <label htmlFor="graduationDate" className="">
                                                Expected Date of Graduation
                                            </label>
                                            <input
                                                type="date"
                                                className="formbold-form-input"
                                                id="graduationDate"
                                                name="graduationDate"
                                                value={formData.graduationDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="button" onClick={nextStep} className="formbold-btn">
                                        Next
                                    </button>
                                </div>

                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h1 className='fs-3 text-[#27ae60] pb-2'>Career Motivations</h1>
                                <p className='mb-4 border-bottom'>Tell us what motivates you in your career</p>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("personalProfessionalBuildUp")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="personalProfessionalBuildUp" />
                                        Personal and professional build up
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("gainPracticalExperience")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="gainPracticalExperience" />
                                        Gain practical / hands on experience
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("seekingInternship")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="seekingInternship" />
                                        Seeking internship
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("volunteership")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="volunteership" />
                                        Volunteership
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("paidInternship")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="paidInternship" />
                                        Paid internship
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("improveEmployability")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="improveEmployability" />
                                        Improve employability (Job opportunities)
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            checked={formData.motivations.includes("connectionsToIndustry")}
                                            onChange={handleMotivationChange}
                                            className='mr-5 mb-4' type="checkbox" name="motivations" value="connectionsToIndustry" />
                                        Connections to industry
                                    </label>
                                </div>

                                <div className="button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="submit" className="formbold-btn">
                                        Submit
                                    </button>
                                </div>
                            </div>

                        )}

                    </form>
                </div>
            </div >
        </div >
    );
};

export default MultiStepForm;
