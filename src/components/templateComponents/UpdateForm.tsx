import React, { useState } from 'react'
import { updateDoc, query, where, getDocs, collection, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../Config/firebase.config";
import { useAuth } from '../../authProvider';

const UpdateForm = ({
  cvData,
  setCvData,
  handlePersonalDetailChange,
  handleSummaryChange,
  handleExperienceChange,
  handleEducationChange,
  handleSkillsChange,
  handleCertificationsChange
}) => {

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { user } = useAuth();
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    // Update cvData with the selected profile picture file
    setCvData((prevData) => ({
      ...prevData,
      profilePicture: file
    }));
    console.log(cvData);
    

  };

  const handleSubmit = async (e) => {
    const userId = user?.uid;
    e.preventDefault();

    try {
      const userDataRef = collection(db, "userData");
      const q = query(userDataRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          
          let profilePicture = cvData.profilePicture; // Keep existing data

          // Upload profile picture if a new file is selected
          if (profilePic) {
              const storage = getStorage();
              const profilePicRef = ref(storage, `profilePictures/${userId}`);
              await uploadBytes(profilePicRef, profilePic);
              const profilePicUrl = await getDownloadURL(profilePicRef);

              // Update profilePicture as an object with URL and metadata
              profilePicture = {
                  url: profilePicUrl,
                  fileType: profilePic.type,
                  fileName: profilePic.name,
              };
          }

          // Update Firestore document with updated cvData including profilePicture object
          await updateDoc(docRef, {
              ...cvData,
              profilePicture,
          });
            alert("Profile updated successfully!");
        } else {
            console.log("No document found with the specified userId.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
};

  return (
    <div>
      {/* Form Section */}
      <div className="my-5 p-4 w-50" style={{ border: "5px solid lightgrey" }}>
        <div className='d-flex flex-row justify-content-between'>
          <h4>Update CV Details</h4>
          <button onClick={handleSubmit} className="formbold-btn">Update</button>
        </div>
        <form>
          <div className="formbold-input-flex">
            <div>
              <label className="formbold-form-label">Name</label>
              <input
                type="text"
                name="name"
                value={cvData.personalDetails.name}
                onChange={handlePersonalDetailChange}
                className="formbold-form-input"
              />
            </div>
            <div>
              <label className="formbold-form-label">Email</label>
              <input
                type="email"
                name="email"
                value={cvData.personalDetails.email}
                onChange={handlePersonalDetailChange}
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label className="formbold-form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={cvData.personalDetails.phone}
                onChange={handlePersonalDetailChange}
                className="formbold-form-input"
              />
            </div>
          </div>

          {/* Add Profile Picture Upload */}
          <div className="form-group">
            <label className="formbold-form-label">Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="formbold-form-input"
            />
          </div>

          <div>
            <label className="formbold-form-label">Personal Summary</label>
            <textarea
              name="personalSummary"
              value={cvData.personalSummary}
              onChange={handleSummaryChange}
              className="formbold-form-input"
            />
          </div>

          {/* Experience */}
          <h5>Experience</h5>
          {cvData.experience.map((exp, index) => (
            <div key={index}>
              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
                <div>
                  <label className="formbold-form-label">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Education */}
          <h5>Education</h5>
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
                <div>
                  <label className="formbold-form-label">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">Duration</label>
                  <input
                    type="text"
                    value={edu.duration}
                    onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Skills */}
          <h5>Skills</h5>
          {cvData.skills.map((skill, index) => (
            <div className="form-group" key={index}>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
                className="formbold-form-input"
              />
            </div>
          ))}

          {/* Certifications */}
          <h5>Certifications</h5>
          {cvData.certifications.map((cert, index) => (
            <div key={index}>
              <div className="formbold-input-flex">
                <div>
                  <label className="formbold-form-label">Title</label>
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => handleCertificationsChange(index, 'title', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
                <div>
                  <label className="formbold-form-label">Link</label>
                  <input
                    type="url"
                    value={cert.link}
                    onChange={(e) => handleCertificationsChange(index, 'link', e.target.value)}
                    className="formbold-form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default UpdateForm
