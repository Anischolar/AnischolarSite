import React from 'react'

function CertificatesPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Certifications</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            <div className='gap-3 my-4'>
                {resumeInfo?.certificates.map((cert, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <h2 className='text-xs'>{cert.name}</h2>
                        <a href={cert.link} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            {cert.link}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CertificatesPreview