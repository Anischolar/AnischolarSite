import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import { useEffect, useState } from "react";
import React from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../Config/firebase.config";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import Header from "../components/Header";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryOfOrigin: "",
    address: "",
    yearOfStudy: "",
    GPA: "",
    CGPA: "",
    preference: "",
    internshipId: "", // Added field
    internshipName: "", // Added field
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from URL
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("internshipId") || "";
    const internshipName = params.get("internshipName") || "";

    setFormData((prevState) => ({
      ...prevState,
      internshipId,
      internshipName,
    }));
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store the application data in Firestore
      await addDoc(collection(db, "applications"), formData);

      const templateParams = {
        from_name: "AniScholar",
        name: `${formData.firstName} ${formData.lastName}`,
        reply_to: formData.email,
        internship: formData.preference,
        email: formData.email,
      };

      console.log("Template Params:", templateParams); // Log template params

      // Send email to the applicant
      await emailjs.send(
        "service_9woakfw",
        "template_0qrgp0v",
        templateParams,
        "N6kF27B0JBmJHfAVf"
      );

      // Send email to admin
      const adminTemplateParams = {
        name: `${formData.firstName} ${formData.lastName}`,
        to_name: "Admin",
        message: `${formData.firstName} ${formData.lastName} has applied for the internship: ${formData.internshipName}.`,
        email: formData.email,
      };

      console.log("Admin Template Params:", adminTemplateParams);

      await emailjs.send(
        "service_9woakfw",
        "template_msw9di6",
        adminTemplateParams,
        "N6kF27B0JBmJHfAVf"
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Application Successful",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/internships");
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
    <>
      <Header title="Internships" title2="Application" />

      <div className="formbold-main-wrapper">
        <div className="mobile formbold-form-wrapper">
          <form onSubmit={handleSubmit} method="POST">
            <div className="formbold-form-title">
              <h2 className="">Apply for the opportunity</h2>
              <p>
                Apply for our program by filling out the form below. We will get
                back to you as soon as possible.
              </p>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="firstName" className="formbold-form-label">
                  First name
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
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  type="text"
                  className="formbold-form-input"
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
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="formbold-form-input"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="formbold-form-label">
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  type="text"
                  className="formbold-form-input"
                />
              </div>
            </div>

            <div className="formbold-mb-3">
              <label htmlFor="address" className="formbold-form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-mb-3">
              <label htmlFor="countryOfOrigin" className="formbold-form-label">
                Country of Origin
              </label>
              <input
                id="countryOfOrigin"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                required
                type="text"
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="yearOfStudy" className="formbold-form-label">
                  Year of study
                </label>
                <input
                  type="text"
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                  className="formbold-form-input"
                />
              </div>
              <div>
                <label htmlFor="preference" className="formbold-form-label">
                  Preference
                </label>
                <input
                  type="text"
                  id="preference"
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                  required
                  className="formbold-form-input"
                />
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="CGPA" className="formbold-form-label">
                  CGPA
                </label>
                <input
                  type="text"
                  id="CGPA"
                  name="CGPA"
                  value={formData.CGPA}
                  onChange={handleChange}
                  required
                  className="formbold-form-input"
                />
              </div>
            </div>

            <div className="formbold-checkbox-wrapper">
              <label
                htmlFor="supportCheckbox"
                className="formbold-checkbox-label"
              >
                <div className="formbold-relative">
                  <input
                    type="checkbox"
                    id="supportCheckbox"
                    className="formbold-input-checkbox"
                  />
                  <div className="formbold-checkbox-inner">
                    <span className="formbold-opacity-0">
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        className="formbold-stroke-current"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          strokeWidth="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                I agree to the defined
                <a href="/"> terms, conditions, and policies</a>
              </label>
            </div>

            <button type="submit" className="formbold-btn" disabled={isLoading}>
              {isLoading ? "Sending application..." : " Apply Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
