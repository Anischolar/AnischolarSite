import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './authProvider'
import HomePage from './pages/homePage'
import Blogs from './pages/blogs'
import Internships from './pages/internships'
import ApplicationForm from './pages/applicationForm'
import Farm from './pages/farm'
import SingleBlog from './pages/singleBlog'
import Login from './pages/login'
import Register from './pages/register'
import NotFound from './pages/notFound'
import './App'
import UserDataForm from './pages/userDataForm'
import CVPreview from './pages/cvPreview'
import TemplateSelect from './pages/templateSelect'
import FormSection from './pages/resumes/resume/FormSection'
import EditResume from './pages/editResume'
import Resumes from './pages/resumes'
import Profile from './pages/profile/page/profile'
import PaymentPlans from './pages/paymentPlans'
import Checkout from './pages/checkout'
import Opportunities from './pages/opportunities'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/farm/:id" element={<Farm />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/applicationForm" element={<ApplicationForm />} />
          <Route path="/blogDetail/:id" element={<SingleBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDataForm" element={<UserDataForm />} />
          <Route path="/resumeForm" element={<EditResume />} />
          <Route path="/templates" element={<TemplateSelect />} />
          <Route path="/cvPreview" element={<CVPreview />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/resumes/resume/:resumeId/edit" element={<EditResume />} />
          <Route path="/my-resume/:resumeId/view" element={<CVPreview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compare/plans" element={<PaymentPlans />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
)
