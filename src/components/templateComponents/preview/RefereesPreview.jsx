import React from 'react'

function RefereesPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Referees</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.referees && resumeInfo.referees.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {resumeInfo.referees.slice(0, 2).map((referee, index) => (
                        <div key={index} className="space-y-1">
                            <h3 
                                className="font-bold text-sm"
                               
                            >
                                {referee.name}
                            </h3>
                            {referee.position && <p className="text-xs">{referee.position}</p>}
                            {referee.company && <p className="text-xs">{referee.company}</p>}
                            {referee.phone && <p className="text-xs">Phone: {referee.phone}</p>}
                            {referee.email && <p className="text-xs">Email: {referee.email}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RefereesPreview