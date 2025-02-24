import React from 'react';

const Template4 = ({ cvData, setCvContent, isEditing }) => {


    const handleBlur = (
        field: keyof typeof cvData,
        value: string,
        subField: string | null = null,
        index: number | null = null,
        subIndex: number | null = null
    ) => {
        const updatedData = { ...cvData };

        if (subField && index !== null) {
            if (subIndex !== null) {
                updatedData[field][index][subField][subIndex] = value;
            } else {
                updatedData[field][index][subField] = value;
            }
        } else if (subField) {
            updatedData[field][subField] = value;
        } else {
            updatedData[field] = value;
        }

        setCvContent(updatedData);
    };

    return (
        <div className='mx-5'>
            <div>
                <h2
                    className="fw-bold text-center fs-4"
                    style={{
                        // color: resumeInfo?.themeColor
                    }}
                >
                    {cvData?.personalDetails?.name}
                </h2>
                <h2 className="text-center fs-6 fw-semibold">
                    Job Title: {cvData?.title}
                </h2>
                <h2
                    className="text-center fw-normal fs-7"
                    style={{
                        // color: resumeInfo?.themeColor
                    }}
                >
                    {cvData?.personalDetails?.address}
                </h2>

                <div className="d-flex justify-content-between">
                    <h2
                        className="fw-normal fs-7"
                        style={{
                            // color: resumeInfo?.themeColor
                        }}
                    >
                        {cvData?.personalDetails?.phone}
                    </h2>
                    <h2
                        className="fw-normal fs-7"
                        style={{
                            // color: resumeInfo?.themeColor
                        }}
                    >
                        {cvData?.personalDetails?.email}
                    </h2>
                </div>
                <hr
                    className="my-2"
                    style={{
                        borderWidth: '1.5px',
                        // borderColor: resumeInfo?.themeColor
                    }}
                />
            </div>

            {/* Personal Summary */}
            <div

            >
                {cvData?.summery}
            </div>

            <div className="my-4">
                <h2
                    className="text-center fw-bold fs-6 mb-2"
                    style={{
                        // color: resumeInfo?.themeColor,
                    }}
                >
                    Professional Experience
                </h2>
                <hr
                    style={{
                        // borderColor: resumeInfo?.themeColor,
                    }}
                />

                {cvData?.experience?.map((experience, index) => (
                    <div key={index} className="my-4">
                        <h2
                            className="fs-6 fw-bold"
                            style={{
                                // color: resumeInfo?.themeColor,
                            }}
                        >
                            {experience?.title}
                        </h2>
                        <h2 className="fs-7 d-flex justify-content-between">
                            {experience?.company}
                            <span>
                            {experience?.startDate} To {experience?.currentlyWorking?'Present':experience?.endDate}
                            </span>
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

            <div className="my-4">
                <h2
                    className="text-center fw-bold fs-6 mb-2"
                    style={{
                        // color: resumeInfo?.themeColor,
                    }}
                >
                    Education
                </h2>
                <hr
                    style={{
                        // borderColor: resumeInfo?.themeColor,
                    }}
                />

                {cvData?.education?.map((education, index) => (
                    <div key={index} className="my-4">
                        <h2
                            className="fs-6 fw-bold"
                            style={{
                                // color: resumeInfo?.themeColor,
                            }}
                        >
                            {education.universityName}
                        </h2>
                        <h2 className="fs-7 d-flex justify-content-between">
                            {education?.degree}
                            <span>
                            {education?.startDate} - {education?.endDate}
                            </span>
                        </h2>
                    </div>
                ))}
            </div>

            <div className="my-4">
                <h2
                    className="text-center fw-bold fs-6 mb-2"
                    style={{
                        // color: resumeInfo?.themeColor,
                    }}
                >
                    Skills
                </h2>
                <hr
                    style={{
                        // borderColor: resumeInfo?.themeColor,
                    }}
                />

                <div className="row row-cols-2 g-3 my-4">
                    {cvData?.skills?.map((skill, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0">{skill?.name}</h4>
                            <div className="bg-light w-50" style={{ height: '0.5rem' }}>
                                <div
                                    style={{
                                        // backgroundColor: resumeInfo?.themeColor,
                                        width:   80 + '%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
};

export default Template4;
