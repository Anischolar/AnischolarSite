import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authProvider";

// Auth
import Login from "./pages/login";
import Register from "./pages/register";

// Student Pages
import HomePage from "./pages/homePage";
import Blogs from "./pages/blogs";
import Internships from "./pages/internships";
import ApplicationForm from "./pages/applicationForm";
import Farm from "./pages/farm";
import SingleBlog from "./pages/singleBlog";
import NotFound from "./pages/notFound";
import "./App";
import UserDataForm from "./pages/userDataForm";
import CVPreview from "./pages/cvPreview";
import TemplateSelect from "./pages/templateSelect";
import FormSection from "./pages/resumes/resume/FormSection";
import EditResume from "./pages/editResume";
import Resumes from "./pages/resumes";
import Profile from "./pages/profile/page/profile";
import PaymentPlans from "./pages/paymentPlans";
import Checkout from "./pages/checkout";
import Opportunities from "./pages/opportunities";
import ShortCourses from "./pages/shortCourses";
import PaymentConfirmation from "./pages/paymentConfirmation";
import Thankyou from "./pages/thankyou";
import CoverLetterIndex from "./pages/coverLetters";

// Industry Pages
import Index from "./pages/industry/Index";
import CreateProfile from "./pages/industry/CreateProfile";
import RequestDemo from "./pages/industry/RequestDemo";
import JobPosting from "./pages/industry/JobPosting";
import Applications from "./pages/industry/Applications";
import CompanySignIn from "./pages/industry/companySignin";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Students */}
          <Route path="/" element={<HomePage />} />
          <Route path="farm/:id" element={<Farm />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="internships" element={<Internships />} />
          <Route path="short-courses" element={<ShortCourses />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="applicationForm" element={<ApplicationForm />} />
          <Route path="blogDetail/:id" element={<SingleBlog />} />
          <Route path="userDataForm" element={<UserDataForm />} />
          <Route path="resumeForm" element={<EditResume />} />
          <Route path="templates" element={<TemplateSelect />} />
          <Route path="cvPreview" element={<CVPreview />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="resumes/resume/:resumeId/edit" element={<EditResume />} />
          <Route path="my-resume/:resumeId/view" element={<CVPreview />} />
          <Route path="cover-letter" element={<CoverLetterIndex />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id/view" element={<Profile />} />
          <Route path="compare/plans" element={<PaymentPlans />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="thankyou" element={<Thankyou />} />
          <Route path="form-section" element={<FormSection/>} />

          {/* Industry Routes */}
          <Route
            path="industry/*"
            element={
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="create-profile" element={<CreateProfile />}  />
                <Route path="signin" element={<CompanySignIn />} />
                <Route path="job-posting" element={<JobPosting />} />
                <Route path="request-demo" element={<RequestDemo />} />
                <Route path="applications" element={<Applications />} />
              </Routes>
            }
          ></Route>
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
