import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Activity from '../components/Activity'
import { useAuth } from '../../../authProvider'
import { getDocs, query, where, addDoc, collection } from "@firebase/firestore";
import { db } from '../../../Config/firebase.config'
import TopHeader from '../../../components/Header'
import Experience from '../components/Experience'
import Education from '../components/Education'
import { useParams } from 'react-router-dom'
import Certification from '../components/Certification'
import Skills from '../components/Skills'
import Interests from '../components/Interests'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {
    const { user, cvContent, setCvContent, template } = useAuth();
    const [userData, setUserData] = useState(null)
    const { id } = useParams();
    console.log(id);


    useEffect(() => {
        const userId = user?.uid;
        const fetchUserData = async () => {
            if (!id) {
                try {
                    const userDataRef = collection(db, "userData");
                    const q = query(userDataRef, where("userId", "==", userId));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const doc = querySnapshot.docs[0];
                        setUserData({
                            ...doc.data(), // Merge the fetched data
                            id: doc.id, // Ensure the ID is also set
                        });
                    } else {
                        console.log("No user data found for the specified userId.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                try {
                    const userDataRef = collection(db, "userData");
                    const q = query(userDataRef, where("userId", "==", id));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const doc = querySnapshot.docs[0];
                        setUserData({
                            ...doc.data(), // Merge the fetched data
                            id: doc.id, // Ensure the ID is also set
                        });
                    } else {
                        console.log("No user data found for the specified userId.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }

        };

        if (userId) {
            fetchUserData();
        } else {
            fetchUserData();
        }
    }, [user?.uid]);


    return (
        <>
            <TopHeader title="Profile" title2="" />
            <div className="flex flex-col lg:flex lg:flex-row p-3 lg:p-5 lg:bg-[#f4fcd4]">
               
                <section className="grid gap-4 w-full lg:w-3/4 mt-16">
                 {/* scroll to bottom for the profile link */}
                {
                    !user?.uid && (
                        <p className='text-sm text-gray-500 flex lg:hidden'>
                    Scroll to bottom for your personalized profile link
                </p>
                    )
                } 
                    <Header user={userData} authUser={user} onUpdate={(user) => setUser(user)} />
                    <About user={userData} authUser={user} onUpdate={(user) => setUser(user)} />
                    <Activity user={userData} authUser={user} id="234" />

                    <div className="bg-white rounded border border-gray-300 p-4">

                        <Experience user={userData} authUser={user} />
                    </div>
                    <div className="bg-white rounded border border-gray-300 p-4">

                        <Education user={userData} authUser={user} />
                    </div>
                    <div className="bg-white rounded border border-gray-300 p-4">

                        <Certification user={userData} authUser={user} />

                    </div>

                    <div className="bg-white rounded border border-gray-300 p-4">

                        <Skills user={userData} authUser={user} />
                    </div>

                    <div className="bg-white rounded border border-gray-300 p-4">

                        <Interests user={userData} authUser={user} />
                    </div>
                </section>
                <div className="lg:w-80 lg:h-max ml-4 bg-white rounded border border-gray-300 p-4 mt-[105px]">
                    <div className='flex justify-between'>
                        <h2 className="font-bold text-lg mb-2">Public Profile Url</h2>
                        <button
                            className="ml-2 p-2 hover:bg-gray-200 rounded-full"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `https://anischolar.com/#/profile/${user?.uid}/view`
                                );
                                toast.success("Copied to clipboard");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625V4.125A1.125 1.125 0 014.125 3h10.5c.621 0 1.125.504 1.125 1.125v3.375m-9.375 3h12.75M6 10.5h12.75m-9.375 3h12.75"
                                />
                            </svg>
                        </button>
                    </div>

                    <span className='w-full break-all'>{`https://anischolar.com/#/profile/${user?.uid}/view`}</span>

                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Profile