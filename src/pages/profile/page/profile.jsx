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
            <div className="flex flex-row p-3 lg:p-5 lg:bg-[#f4fcd4]">
                <section className="grid gap-4 w-full lg:w-3/4 mt-16">
                    <Header user={userData} authUser={user} onUpdate={(user) => setUser(user)} />
                    <About user={userData} authUser={user} onUpdate={(user) => setUser(user)} />
                    <Activity user={userData} authUser={user} id="234" />

                    <div className="bg-white rounded border border-gray-300 p-4">
                        <h2 className="font-bold text-lg mb-2">Experience</h2>
                        <Experience user={userData} authUser={user} />
                    </div>
                    <div className="bg-white rounded border border-gray-300 p-4">
                        <h2 className="font-bold text-lg mb-2">Education</h2>
                        <Education user={userData} authUser={user} />
                    </div>
                    <div className="bg-white rounded border border-gray-300 p-4">
                        <h2 className="font-bold text-lg mb-2">Certificatons</h2>
                        <p>To do</p>
                    </div>

                    <div className="bg-white rounded border border-gray-300 p-4">
                        <h2 className="font-bold text-lg mb-2">Skills</h2>
                        <p>To do</p>
                    </div>

                    <div className="bg-white rounded border border-gray-300 p-4">
                        <h2 className="font-bold text-lg mb-2">Interests</h2>
                        <p>To do </p>
                    </div>
                </section>
                <div className="hidden lg:block lg:w-80 lg:h-max ml-4 bg-white rounded border border-gray-300 p-4 mt-[105px]">
                    <div className='flex justify-between'>
                        <h2 className="font-bold text-lg mb-2">Public Profile Url</h2>
                    <button
                        className="bg-gray-100 w-8 h-8 rounded-full grid place-items-center hover:bg-gray-300 transition-colors"

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 512 512">
                            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                        </svg>
                    </button>
                    </div>

                    <span className='w-full break-all'>http://localhost:5173/profile/7KfecfwKzlSNvIGoWahFmYxBwXH2/view</span>
                    
                </div>
            </div>
        </>
    )
}

export default Profile