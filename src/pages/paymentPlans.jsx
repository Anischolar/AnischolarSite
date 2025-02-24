import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const PayCard = ({ title, price, period, features }) => {
    return (
        <div className="flex flex-col rounded-3xl border border-gray-900 p-4 shadow-2xl bg-[#fff]">
            <div className="px-4 py-6 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">Suitable to grow steadily.</p>
                    </div>
                    <div className="mt-6">
                        <p>
                            <span className="text-5xl font-light tracking-tight text-black">
                                {price}
                            </span>
                            <span className="text-base font-medium text-gray-500"> {period} </span>
                        </p>
                    </div>
                    <div className="mt-6">
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600">
                                    <svg className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                {/* <a
                    aria-describedby="tier-company"
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-[white] duration-200 bg-[black] border-2 border-[black] rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    href="#"
                >
                    Get started
                </a> */}
                <Link
                    to="/checkout"
                    state={{ plan: { title, price, period, features } }}
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-white hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                    Get started
                </Link>
            </div>
        </div>
    )
}

const PaymentPlans = () => {
    const plans = [
        {
            title: 'Basic Plan',
            price: 'UGX 10,000',
            period: 'per month',
            features: [
                'Signing up',
                'Profile build up',
                'Resource access (resume, CV, cover letter)',
                'Soft skills training & certificates',
                'Opportunity centre access',
                'Masterclasses & webinars'
            ]
        },
        {
            title: 'Standard Plan',
            price: 'UGX 50,000',
            period: 'per Year',
            features: [
                'Profile build up',
                'Unlimited resource access',
                'Soft skills training & certificates',
                'Unlimited opportunity centre access',
                'Internships access',
                'Industry insights & trends'
            ]
        },
        {
            title: 'Premium Plan',
            price: 'UGX 100,000',
            period: 'per Year',
            features: [
                'Advanced profile build up',
                'Advanced resource access - Pro',
                'Soft skills training & certificates',
                'Unlimited opportunity centre access',
                'Guaranteed internships access',
                'Personalised email updates monthly'
            ]
        }
    ]

    return (
        <>
            <Header title="Plans" title2="" />
            <div className='plan'>
                <div className='pt-48 text-2xl lg:text-5xl px-5 lg:px-48 text-white'>
                    Choose the right plan based on your goals, and budget
                </div>
                <div className='flex flex-col lg:flex-row gap-4 justify-between pt-10 px-4 lg:mx-20'>
                    {plans.map((plan, index) => (
                        <PayCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            period={plan.period}
                            features={plan.features}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default PaymentPlans