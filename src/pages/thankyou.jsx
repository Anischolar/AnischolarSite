import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Thankyou = () => {
        const navigate = useNavigate();
  return (
    <>
    <Header title="Thank-you" title2="" />

    <div className="min-h-screen bg-gray-100 py-8 px-4 mt-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Thank you for your payment</h2>

            {/* Payment confirmation */}
            <div className="mb-6">
                <div className="flex flex-col gap-2">
                    <p className='text-sm' > Your package is now being reviewed. You will receive a notification within 24 hours.</p>
                </div>
            </div>

            <div className="flex mt-4 justify-around">
                <button 
                onClick={() => navigate('/')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg">Back to Home</button>

                </div>
        </div>
    </div>  
    </>
  )
}

export default Thankyou
