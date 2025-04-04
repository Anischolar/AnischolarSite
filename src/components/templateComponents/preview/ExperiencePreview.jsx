import React from 'react';

function ExperiencePreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />
            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between italic'>{experience?.companyName},
                        {experience?.city},
                        {experience?.state}
                        <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate} </span>
                    </h2>

                    {/* Ensure the summary is inside a <ul> for proper bullets */}
                    <ul
                        id={`work-summary-${index}`}
                        className="list-disc pl-5 text-xs my-2"
                        dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
                    ></ul>

                    {/* Inline styles to enforce bullet visibility */}
                    <style>
                        {`
                            #work-summary-${index} ul {
                                list-style-type: disc !important;
                        
                            }
                            #work-summary-${index} li {
                                display: list-item !important;
                            }
                        `}
                    </style>
                </div>
            ))}
        </div>
    );
}

export default ExperiencePreview;
