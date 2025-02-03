import React from 'react';

function Template1({ cvData, setCvContent, isEditing }) {
  console.log(cvData);
  
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
    <div className="my-1 shadow-sm w-full" style={{ border: "5px solid #e0e0e0", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      {/* Header Section */}
      <div className="d-flex align-items-center mb-0" style={{ height: "150px" }}>
        <div className="col-3 text-center">
          <img
            className="rounded-circle border border-3"
            src={cvData?.profilePicture?.url}
            alt="profile-pic"
            style={{ maxHeight: "150px", width: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="col-6 text-center font-weight-bold">
          <h1
            contentEditable={isEditing}
            onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "name")}
            style={{ color: "#333", fontSize: "35px", margin: "0" }}
          >
            {cvData?.personalDetails?.name}
          </h1>
          <h5
            contentEditable={isEditing}
            onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "jobTitle")}
            style={{ color: "#6c757d", fontStyle: "italic" }}
          >
           {cvData?.title}
          </h5>
        </div>
        <div className="col-3 text-left" style={{ fontSize: "10px" }}>
          <p
            contentEditable={isEditing}
            onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "email")}
            className="m-0"
          >
            {cvData?.personalDetails?.email}
          </p>
          <p
            contentEditable={isEditing}
            onBlur={(e) => handleBlur("personalDetails", e.target.innerText, "phone")}
            className="m-0"
          >
            {cvData?.personalDetails?.phone}
          </p>
        </div>
      </div>

      {/* Personal Summary */}
      <div
        contentEditable={isEditing}
        onBlur={(e) => handleBlur("personalSummary", e.target.innerText)}
        className="mx-4 mb-4"
        style={{ fontSize: "18px", color: "#4a4a4a" }}
      >
        {cvData?.summery}
      </div>

      <hr style={{ height: "4px", backgroundColor: "#6c757d" }} />

      {/* Professional Experience */}
      <div className="container">
        <div className="row mb-4">
          <div className="col-3 text-left" style={{ color: "#333" }}>
            <h4>Professional Experience</h4>
          </div>
          <div className="col-9 text-left" style={{ fontSize: "16px" }}>
            {cvData?.experience?.map((item, index) => (
              <div key={index} className="mb-3">
                <div
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("experience", e.target.innerText, "jobTitle", index)}
                  className="font-weight-bold"
                  style={{ fontSize: "18px", color: cvData?.themeColor }}
                >
                  {item?.title}
                </div>
                <div
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("experience", e.target.innerText, "company", index)}
                  style={{ color: cvData?.themeColor}}
                >
                  Worked at {item?.company} From {item?.startDate} To {item?.currentlyWorking?'Present':item?.endDate}
                </div>
                {/* Ensure the summary is inside a <ul> for proper bullets */}
                <ul
                        id={`work-summary-${index}`}
                        className="list-disc pl-5 text-xs my-2"
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

        <hr style={{ height: "4px", backgroundColor: "#6c757d" }} />

        {/* Education Section */}
        <div className="row mb-4">
          <div className="col-3 text-left" style={{ color: "#333" }}>
            <h4>Education</h4>
          </div>
          <div className="col-9 text-left" style={{ fontSize: "16px" }}>
            {cvData?.education?.map((item, index) => (
              <div key={index} className="mb-2">
                <div
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("education", e.target.innerText, "degree", index)}
                  className="font-weight-bold"
                  style={{ color: "#333" }}
                >
                  {item?.degree}
                </div>
                <div
                  contentEditable={isEditing}
                  onBlur={(e) => handleBlur("education", e.target.innerText, "institution", index)}
                  style={{ color: "#6c757d" }}
                >
                  Studied at {item?.universityName} from {item?.startDate} - {item?.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ height: "4px", backgroundColor: "#6c757d" }} />

        {/* Key Skills Section */}
        <div className="row mb-4">
          <div className="col-3 text-left">
            <h4 style={{ color: "#333" }}>Key Skills</h4>
          </div>
          <div className="col-9 text-left" style={{ fontSize: "16px" }}>
            <ul  contentEditable={isEditing} className="pl-3">
              {cvData?.skills.map((skill, index) => (
                <li
                  key={index}
                  onBlur={(e) => handleBlur("skills", e.target.innerText, null, index)}
                  style={{ color: "#4a4a4a" }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr style={{ height: "4px", backgroundColor: "#6c757d" }} />

        {/* Certifications Section */}
        <div className="row mb-4">
          <div className="col-3 text-left">
            <h4 style={{ color: "#4a4a4a", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Certifications</h4>
          </div>
          <div className="col-9 text-left" style={{ fontSize: "16px" }}>
            <ul style={{ listStyleType: "none", paddingLeft: "1.25rem", color: "#555", lineHeight: "1.6" }}>
              {cvData?.certificates?.map((cert, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <span
                    contentEditable={isEditing}
                    onBlur={(e) => handleBlur("certifications", e.target.innerText, "title", index)}
                    style={{ color: "#6c757d", textDecoration: "none" }}
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

export default Template1;
