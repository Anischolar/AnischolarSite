import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../authProvider';

const PhoneNavDropdown = () => {
    const { logout } = useAuth();
    return (
        <div>
            <div class="flex flex-row justify-between">
                <Link to="/profile" className="flex items-center gap-1 rounded-md ml-4 py-2 px-1 !h-10 hover:border hover:border-slate-800">
                   <div className='flex flex-row'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                    </svg>
                    <span className='ml-2'>Profile</span>
                   </div>
                   
                </Link>

                <button
                className="flex justify-center gap-1 rounded-md bg-[#fb923c] ml-3 py-2 px-3 !h-10 font-semibold hover:bg-[#f7ab6d] focus:ring-2 focus:ring-[#fcd5b6] text-slate-100"
                onClick={logout}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
                </svg>
                <span>Logout</span>
            </button>
            </div>

          

        </div >
    )
}

export default PhoneNavDropdown
