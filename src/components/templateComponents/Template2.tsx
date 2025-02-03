import React, { useState } from 'react';

function Template2({ cvData, setCvContent, isEditing }) {

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
    <div className='w-100 shadow-lg' style={{ border: "1px solid #d3d3d3", borderRadius: "10px", overflow: "hidden", background: "linear-gradient(135deg, #f8f9fa 40%, #e9ecef)" }}>
      <div className='row m-0'>
        
        {/* Sidebar Section */}
        <div className='col-4 d-flex flex-column align-items-center pt-5' style={{ backgroundColor: "#3a506b", color: "#f8f9fa" }}>
          <div className="media mb-4">
            <img className="rounded-circle border border-3" src={cvData?.profilePicture?.url} alt='profile-pic' 
                 style={{ maxHeight: '180px', width: '150px', objectFit: 'cover', transition: 'transform 0.3s' }} />
          </div>
          <div className="text-center font-weight-bold mb-3" style={{ fontFamily: "Serif", transition: 'color 0.3s' }}>
            <h2
              className='editable'
              contentEditable={isEditing}
              onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "name")}
              style={{ fontSize: "28px", margin: 0 }}
            >
              {cvData?.personalDetails.name}
            </h2>
            <h5
              className='editable'
              contentEditable={isEditing}
              onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "jobTitle")}
              style={{ color: "#b3d4d8", fontSize: "18px", marginTop: "5px" }}
            >
              {cvData?.personalDetails.jobTitle}
            </h5>
          </div>
          <div className="px-4 w-100" style={{ backgroundColor: "#3a506b", borderTop: "1px solid #6c757d" }}>
            <div className="mb-3">
              <span style={{ fontWeight: "bold", color: "#f8f9fa" }}>Email:</span>
              <span
                className='editable'
                contentEditable={isEditing}
                onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "email")}
                style={{ color: "#b3d4d8", display: "block", marginTop: "5px" }}
              >
                {cvData?.personalDetails.email}
              </span>
            </div>
            <div className="mb-3">
              <span style={{ fontWeight: "bold", color: "#f8f9fa" }}>Contact:</span>
              <span
                className='editable'
                contentEditable={isEditing}
                onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "phone")}
                style={{ color: "#b3d4d8", display: "block", marginTop: "5px" }}
              >
                {cvData?.personalDetails.phone}
              </span>
            </div>
          </div>
          {/* Key Skills */}
          <div className="px-4 w-100">
            <span style={{ fontWeight: "bold", color: "#f8f9fa" }}>Key Skills</span>
            <ul className='editable' contentEditable={isEditing} style={{ color: "#b3d4d8", fontSize: "16px" }}>
              {cvData?.skills.map((skill, index) => (
                <li
                  key={index}
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("skills", e.target.innerText, null, index)}
                  style={{ color: "#b3d4d8" }}
                >
                  {skill?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className='col-8 p-5' style={{ backgroundColor: "#f4f6f9" }}>
          
          {/* Personal Summary */}
          <div className="mb-4">
            <h4 style={{ color: "#3a506b" }}>Personal Summary</h4>
            <p
              className='editable'
              contentEditable={isEditing}
              onBlur={(e) => handleBlur("personalSummary", e.target.innerText)}
              style={{ fontSize: "16px", color: "#6c757d" }}
            >
              {cvData?.summery}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="mb-4">
            <h4 style={{ color: "#3a506b" }}>Professional Experience</h4>
            <div>
              {cvData?.experience?.map((item, index) => (
                <div key={index} className="mb-3 pl-3" style={{ borderLeft: "3px solid #3a506b", paddingLeft: "15px" }}>
                  <h5
                    className='editable'
                    contentEditable={isEditing}
                    onBlur={(e) => handleBlur("experience", e.target.innerText, "company", index)}
                    style={{ fontSize: "18px", color: "#3a506b", margin: 0 }}
                  >
                    {item?.company}
                  </h5>
                  <span
                    className='editable'
                    contentEditable={isEditing}
                    onBlur={(e) => handleBlur("experience", e.target.innerText, "duration", index)}
                    style={{ fontSize: "16px", color: "#6c757d" }}
                  >
                    {item?.startDate} To {item?.currentlyWorking?'Present':item?.endDate}
                  </span>
                  <p
                    className='editable'
                    contentEditable={isEditing}
                    onBlur={(e) => handleBlur("experience", e.target.innerText, "jobTitle", index)}
                    style={{ fontSize: "17px", color: "#495057" }}
                  >
                    <strong>{item?.title}</strong>
                  </p>
              
               {/* Ensure the summary is inside a <ul> for proper bullets */}
               <ul
                        id={`work-summary-${index}`}
                        className="list-disc pl-5 text-xs my-2 text-[#6c757d]"
                        dangerouslySetInnerHTML={{ __html: item?.workSummery }}
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
          </div>

          {/* Education */}
          <div className="mb-4">
            <h4 style={{ color: "#3a506b" }}>Education</h4>
            {cvData?.education?.map((item, index) => (
              <div key={index} className="mb-3 pl-3" style={{ borderLeft: "3px solid #3a506b", paddingLeft: "15px" }}>
                <h5
                  className='editable'
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("education", e.target.innerText, "degree", index)}
                  style={{ fontSize: "18px", color: "#3a506b", margin: 0 }}
                >
                  {item?.degree}
                </h5>
                <span
                  className='editable'
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("education", e.target.innerText, "institution", index)}
                  style={{ fontSize: "16px", color: "#6c757d" }}
                >
                  at {item?.universityName}
                </span>
                <p
                  className='editable'
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("education", e.target.innerText, "duration", index)}
                  style={{ color: "#6c757d" }}
                >
                  {item?.startDate} - {item?.endDate}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          <div className="mb-4">
            <h4 style={{ color: "#3a506b" }}>Certifications</h4>
            <ul className='editable' style={{ listStyleType: "none", paddingLeft: "1.25rem", color: "#555", lineHeight: "1.6" }}>
              {cvData?.certificates?.map((cert, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => handleBlur("certifications", e.target.innerText, "title", index)}
                    style={{ color: "#4b6982", textDecoration: "none" }}
                  >
                    {cert.name} :
                  </span>
                  <a href={cert.link} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
   &nbsp;{cert.link}
</a>

                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Template2;
