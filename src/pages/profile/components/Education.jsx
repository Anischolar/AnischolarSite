import React, { useEffect, useState } from 'react'

const Education = ({ user, authUser }) => {

        const [education, educationList] = useState(null);
    
        useEffect(() => {
            if (user) {
                educationList(user?.education || null);
            }
        }, [user?.firstName]);
  return (
    <div className='my-6'>
    {education?.map((education,index)=>(
        <div key={index} className='my-2'>
            <h2 className='text-sm font-bold'
             
            >{education.universityName}</h2>
            <h2 className='text-xs'>{education?.degree} in {education?.major}
            
            </h2>
            <p className='text-xs my-2 w-full lg:w-3/4'>
                {education?.description}
            </p>
            <span className='text-xs'>{education?.startDate} - {education?.endDate}</span>
            <hr className='mt-3' style={{
                        borderColor: 'grey'
                    }} />
        </div>
    ))}

    </div>
  )
}

export default Education
