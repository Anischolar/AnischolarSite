import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import CertificatesPreview from './preview/CertificatesPreview'
import RefereesPreview from './preview/RefereesPreview'


function Template5({ cvData, setCvContent }) {

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px] w-full'
            style={{
                borderColor: cvData?.themeColor
            }}>
            {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={cvData} />
            {/* Summery  */}
            <SummeryPreview resumeInfo={cvData} />
            {/* Professional Experience  */}
            {cvData?.experience?.length > 0 && <ExperiencePreview resumeInfo={cvData} />}
            {/* Educational  */}
            {cvData?.education?.length > 0 && <EducationalPreview resumeInfo={cvData} />}
            {/* Skilss  */}
            {cvData?.skills?.length > 0 && <SkillsPreview resumeInfo={cvData} />}
            {/* Certifications */}
            {cvData?.certificates?.length > 0 && <CertificatesPreview resumeInfo={cvData} />}
            {/* Referees*/}
            {cvData?.referees?.length > 0 && <RefereesPreview resumeInfo={cvData} />}
        </div>
    )
}

export default Template5