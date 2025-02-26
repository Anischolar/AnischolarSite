import React, { useEffect, useState } from 'react'

const Certification = ({ user, authUser }) => {

    const [certificates, setCertificates] = useState(null);

    useEffect(() => {
        if (user) {
            setCertificates(user?.certificates || null);
        }
    }, [user?.firstName]);

    console.log(certificates);
    
    return (
        <div className='gap-3 my-4'>
            {certificates?.map((cert, index) => (
                <div key={index} className='flex items-center justify-between'>
                    <h2 className='text-xs'>{cert.name}</h2>
                    <a href={cert.link} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        {cert.link}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Certification
