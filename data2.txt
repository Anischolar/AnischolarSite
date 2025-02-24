import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../Config/firebase.config";
import Swal from "sweetalert2";
import { API_KEY } from '../Config/constants';
import { useAuth } from '../authProvider';

const MultiStepForm: React.FC = () => {
    const { cvContent, setCvContent } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        education: [] as Array<{ degree: string; institution: string; educationStartDate: string; educationEndDate: string }>,
        workExperience: [] as Array<{ jobTitle: string; company: string; experienceStartDate: string; experienceEndDate: string; description: string }>,
        skills: [],
        certifications: [],
    });

    // Temporary state for each education input
    const [educationEntry, setEducationEntry] = useState({
        degree: '',
        institution: '',
        educationStartDate: '',
        educationEndDate: '',
    });

    // Temporary state for each experience input
    const [experienceEntry, setExperienceEntry] = useState({
        jobTitle: '',
        company: '',
        experienceStartDate: '',
        experienceEndDate: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle change for education entry
    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEducationEntry((prev) => ({ ...prev, [name]: value }));
    };

    // Handle change for experience entry
    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExperienceEntry((prev) => ({ ...prev, [name]: value }));
    };


    // Add education entry to formData
    const handleAddEducation = () => {
        setFormData((prev) => ({
            ...prev,
            education: [...prev.education, educationEntry],
        }));
        setEducationEntry({ degree: '', institution: '', educationStartDate: '', educationEndDate: '' });
    };

    // Add education entry to formData
    const handleAddExperience = () => {
        console.log(experienceEntry);
        setFormData((prev) => ({
            ...prev,
            workExperience: [...prev.workExperience, experienceEntry],
        }));
        setExperienceEntry({ jobTitle: '', company: '', experienceStartDate: '', experienceEndDate: '', description: '' });
    };

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 4)); // Limit to max steps
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1)); // Limit to min step
    };

    const generateCV = async () => {
        const formattedExperience = formData.workExperience.map(exp => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          duration: `${exp.experienceStartDate} to ${exp.experienceEndDate}`, // Consistent format
          duties: exp.description.split('. ').map(duty => duty.trim()) // Split duties into an array
        }));
      
        const formattedEducation = formData.education.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          duration: `${edu.educationStartDate} to ${edu.educationEndDate}` // Consistent format
        }));
      
        const prompt = `
          Generate a professional CV in JSON format for the following details:
          {
            "personalDetails": {
              "name": "${formData.firstName} ${formData.lastName}",
              "email": "${formData.email}",
              "phone": "${formData.phoneNumber}"
            },
            "personalSummary": "Generate a personal summary based on the provided details.",
            "experience": ${JSON.stringify(formattedExperience)},
            "education": ${JSON.stringify(formattedEducation)},
            "skills": ${JSON.stringify(formData.skills)},
            "certifications": ${JSON.stringify(formData.certifications)}
          }
          Please make sure that:
          - "duties" are formatted as an array for each experience entry.
          - Use "to" between the start and end dates for consistency in "duration".
          - Skills should be formatted as an array.
          - Certifications should be in the format of an array with "title" and "link" fields.
          Respond only with a valid JSON object in the following format:
          {
            personalDetails: {
              name: "string",
              email: "string",
              phone: "string"
            },
            personalSummary: "string",
            experience: [
              {
                jobTitle: "string",
                company: "string",
                duration: "string",
                duties: ["string"]
              }
            ],
            education: [
              {
                degree: "string",
                institution: "string",
                duration: "string"
              }
            ],
            skills: ["string"],
            certifications: [
              {
                title: "string",
                link: "string"
              }
            ]
          }
        `;
      
        try {
          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
              { role: 'user', content: prompt }
            ],
            max_tokens: 800,
          }, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
      
          const cvText = response.data.choices[0].message.content;
      
          // Use regex to extract the JSON part from the response
          const jsonMatch = cvText.match(/\{.*\}/s);
          if (jsonMatch) {
            const parsedCV = JSON.parse(jsonMatch[0]);  // Parse the JSON part
            setCvContent(parsedCV);
            return parsedCV;  // You can now use the parsed CV
          } else {
            console.error("Could not find a valid JSON in the response");
          }
        } catch (error) {
          console.error('Error generating CV:', error);
        }
      };
      
      
      

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Store the application data in Firestore
            await generateCV();
              await addDoc(collection(db, "userData"), cvContent);
            navigate("/");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Data saved Successfully",
                showConfirmButton: false,
                timer: 1000,
              });
        } catch (error) {
            console.error("Error submitting application:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Application failed, try again",
                showConfirmButton: false,
                timer: 1000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header title="User Data" title2="" />
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h2>Step 1: Bio Data</h2>
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="firstName" className="formbold-form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="formbold-form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="email" className="formbold-form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="formbold-form-input"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="formbold-form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className="formbold-form-input"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={nextStep} className="formbold-btn">
                                    Next
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2>Step 2: Education</h2>
                                {/* <StyledTable /> */}
                                <table className="formbold-table">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Award</th>
                                            <th>Institution</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.education.map((edu, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{edu.degree}</td>
                                                <td>{edu.institution}</td>
                                                <td>{edu.educationStartDate}</td>
                                                <td>{edu.educationEndDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div>
                                    <label htmlFor="degree" className="formbold-form-label">
                                        Award
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="degree"
                                        name="degree"
                                        value={educationEntry.degree}
                                        onChange={handleEducationChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="institution" className="formbold-form-label">
                                        Institution
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="institution"
                                        name="institution"
                                        value={educationEntry.institution}
                                        onChange={handleEducationChange}
                                        required
                                    />
                                </div>
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="educationStartDate" className="formbold-form-label">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className="formbold-form-input"
                                            id="educationStartDate"
                                            name="educationStartDate"
                                            // value={educationEntry.startDate}
                                            onChange={handleEducationChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="educationEndDate" className="formbold-form-label">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className="formbold-form-input"
                                            id="educationEndDate"
                                            name="educationEndDate"
                                            // value={educationEntry.endDate}
                                            onChange={handleEducationChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={handleAddEducation}>
                                    Add
                                </button>
                                <div className="button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="button" onClick={nextStep} className="formbold-btn">
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2>Step 3: Work Experience</h2>
                                <table className="formbold-table">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Degree</th>
                                            <th>Institution</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.workExperience.map((work, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{work.jobTitle}</td>
                                                <td>{work.company}</td>
                                                <td>{work.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div>
                                    <label htmlFor="jobTitle" className="formbold-form-label">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="jobTitle"
                                        name="jobTitle"
                                        value={experienceEntry.jobTitle}
                                        onChange={handleExperienceChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="formbold-form-label">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="company"
                                        name="company"
                                        value={experienceEntry.company}
                                        onChange={handleExperienceChange}
                                        required
                                    />
                                </div>
                                <div className="formbold-input-flex">
                                    <div>
                                        <label htmlFor="experienceStartDate" className="formbold-form-label">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            className="formbold-form-input"
                                            id="experienceStartDate"
                                            name="experienceStartDate"
                                            onChange={handleExperienceChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="experienceEndDate" className="formbold-form-label">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            className="formbold-form-input"
                                            id="experienceEndDate"
                                            name="experienceEndDate"
                                            onChange={handleExperienceChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="formbold-form-label">
                                        Job Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        // value={experienceEntry.description}
                                        onChange={handleExperienceChange}
                                        required
                                        className="formbold-form-input"
                                    />
                                </div>
                                <button type="button" onClick={handleAddExperience}>
                                    Add
                                </button>
                                <div className="button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="button" onClick={nextStep} className="formbold-btn">
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h2>Step 4: Skills & Certifications</h2>
                                <div>
                                    <label htmlFor="skills" className="formbold-form-label">
                                        Skills
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="skills"
                                        name="skills"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="certifications" className="formbold-form-label">
                                        Certifications
                                    </label>
                                    <input
                                        type="text"
                                        className="formbold-form-input"
                                        id="certifications"
                                        name="certifications"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="button-container">
                                    <button type="button" onClick={prevStep} className="formbold-btn">
                                        Previous
                                    </button>
                                    <button type="submit" className="formbold-btn">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
