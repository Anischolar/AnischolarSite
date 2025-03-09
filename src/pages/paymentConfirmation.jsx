import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import YoPayments from '@yoapi/react';
import { auth, db } from '../Config/firebase.config';
import { useAuth } from '../authProvider';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Header from '../components/Header';


const PaymentConfirmation = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    console.log(location);
    console.log(user);
    
    const hamdlePaymentConfirmation = async () => {
        try {
            const docRef = await db.collection('payments').add({
                ...location.state,
                user: user.uid,
                status: 'pending'
            });
            console.log('Document written with ID: ', docRef.id);
            navigate('/thankyou');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    const handlePaymentCancel = () => {
        navigate('/checkout');
    }



    return (
        <>
            <Header title="Checkout" title2="" />
            <div className="min-h-screen bg-gray-100 py-8 px-4 mt-16">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>

                    {/* Payment confirmation */}
                    <div className="mb-6">
                        <div className="flex flex-col gap-2">
                            <p className='text-sm' > Confirm below if the payment has been made and the team will be notified to proceed with your package verification.</p>
                            <div className="flex mt-4 justify-between">
                                <button
                                    onClick={hamdlePaymentConfirmation}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg">Confirm Payment</button>
                                <button 
                                onClick={handlePaymentCancel}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentConfirmation;