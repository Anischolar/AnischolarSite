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



const Checkout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [phone, setPhone] = useState(userData?.phoneNumber || '');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        transaction_reference: '',
        reason: ''
    });

    // Get plan details from navigation state
    const plan = location.state?.plan;
    console.log(location);

    console.log(userData);

    useEffect(() => {
        const userId = user?.uid;
        const fetchUserData = async () => {
            try {
                const userDataRef = collection(db, "userData");
                const q = query(userDataRef, where("userId", "==", userId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setPhone(doc.data().phoneNumber || "");
                } else {
                    console.log("No user data found for the specified userId.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (userId) {
            fetchUserData();
        }
    }, [user?.uid])

    useEffect(() => {
        if (!plan) navigate('/compare/plans');
    }, [plan, navigate]);

    // Configure Recaptcha
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: (response) => {
                    console.log("reCAPTCHA verified successfully!");
                    sendOtp(); // Call sendOtp only when reCAPTCHA is solved
                },
                "expired-callback": () => {
                    console.log("reCAPTCHA expired, resetting...");
                    window.recaptchaVerifier.reset();
                }
            });
        } else {
            // Reset and render a new reCAPTCHA instance
            window.recaptchaVerifier.render().then((widgetId) => {
                grecaptcha.reset(widgetId);
            });
        }
    }



    // Send OTP
    function sendOtp() {
        setLoading(true);

        // Verify reCAPTCHA before sending OTP
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const formattedPhone = `+256${phone.trim().replace(/^0/, '')}`;

        signInWithPhoneNumber(auth, formattedPhone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setVerificationId(confirmationResult.verificationId);
                setLoading(false);
                console.log("OTP sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                setLoading(false);

                // Reset reCAPTCHA on error
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.render().then((widgetId) => {
                        grecaptcha.reset(widgetId);
                    });
                }
            });
    }

    // Verify OTP
    // const verifyOtp = async () => {
    //     try {
    //         setLoading(true);
    //         const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    //         await auth.currentUser.linkWithCredential(credential);
    //         setIsVerified(true);
    //         alert('Phone number verified successfully!');
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         alert('Invalid OTP. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // Updated verifyOtp function
    function verifyOtp() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setIsVerified(true)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    // Handle payment
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const priceString = plan.price;
            // https://aniserver-ghhcfe6k.b4a.run/api/deposit
            // http://localhost:5000/api/deposit
            const response = await fetch("https://aniserver-ghhcfe6k.b4a.run/api/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: parseFloat(priceString.replace(/[^0-9.]/g, '')),
                    account: `256${phone.trim().replace(/^0/, '')}`,
                    provider: "MTN",
                    narrative: paymentDetails.transaction_reference
                }),
            });
            console.log(response);

            alert('Payment initiated successfully!');
            navigate('/payment-confirmation');
        } catch (error) {
            console.error('Payment error:', error);
            alert(`Payment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Checkout" title2="" />
            <div className="min-h-screen bg-gray-100 py-8 px-4 mt-16">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Checkout - {plan?.title}</h2>

                    {/* Phone Verification Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <div className="flex gap-2">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 p-2 border rounded"
                                placeholder="07XXXXXXXX"
                            />
                            <button
                                onClick={sendOtp}
                                disabled={loading}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>

                        {verificationId && (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="p-2 border rounded w-full mb-2"
                                    placeholder="Enter OTP"
                                />
                                <button
                                    onClick={verifyOtp}
                                    disabled={loading}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Payment Form */}
                    {
                        isVerified && (

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Amount</label>
                                    <input
                                        type="text"
                                        value={plan.price}
                                        readOnly
                                        className="p-2 border rounded w-full bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Transaction Reference</label>
                                    <input
                                        type="text"
                                        required
                                        value={paymentDetails.transaction_reference}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, transaction_reference: e.target.value })}
                                        className="p-2 border rounded w-full"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                                >
                                    {loading ? 'Processing Payment...' : 'Complete Payment'}
                                </button>
                            </form>
                         )}

                    <div id="recaptcha-container"></div>
                </div>
            </div>
        </>
    );
};

export default Checkout;