import React, { useEffect, useState } from 'react'

const ReadMore = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <span>
            {isReadMore ? <span dangerouslySetInnerHTML={{ __html: text.slice(0, maxLength) + (text.length > maxLength ? '...' : '') }} />
                : <span dangerouslySetInnerHTML={{ __html: text }} />
            }
            {text.length > maxLength && (
                <span
                    onClick={toggleReadMore}
                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                >
                    {isReadMore ? 'Read More' : 'Show Less'}
                </span>
            )}

        </span>
    );
};



const Experience = ({ user, authUser }) => {
    const [experienceList, setExperinceList] = useState(null);

    useEffect(() => {
        if (user) {
            setExperinceList(user?.experience || null);
        }
    }, [user?.firstName]);
    return (
        <div className='my-2'>
            {experienceList?.map((experience, index) => (
                <div key={index} className='my-3'>
                    <h2 className='text-sm font-bold'
                        style={{
                            // color:resumeInfo?.themeColor
                        }}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience?.companyName},
                        {experience?.city},
                        {experience?.state}
                        <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate} </span>
                    </h2>
                    {/* <p className='text-xs my-2'>
                    {experience.workSummery}
                </p> */}
                    <div className='text-xs my-2'>
                        <ReadMore text={experience?.workSummery || ''} maxLength={100} />
                    </div>
                    <hr className='mt-3' style={{
                        borderColor: 'grey'
                    }} />
                </div>

            ))}
        </div>
    )
}

export default Experience
