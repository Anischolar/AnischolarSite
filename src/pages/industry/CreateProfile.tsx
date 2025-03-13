import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Building, FilePlus, User, ArrowRight, ArrowLeft } from "lucide-react";
import profileImg from "../../assets/img/student-on-pc.jpeg";
import { auth, db } from "../../Config/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/industryComponents/ui/IndustryHeader";

const CreateCompanyProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    website: '',
    size: '',
    location: '',
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateStep1 = () => {
    if (!formData.companyName || !formData.industry || !formData.contactEmail || !formData.password) {
      setError('Please fill all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.contactEmail,
        formData.password
      );
      const user = userCredential.user;

      // Prepare company data
      const companyData = {
        companyName: formData.companyName,
        industry: formData.industry,
        description: formData.description,
        website: formData.website,
        size: formData.size,
        location: formData.location,
        contact: {
          name: formData.contactName,
          title: formData.contactTitle,
          email: formData.contactEmail,
          phone: formData.contactPhone,
        },
        createdAt: new Date(),
        uid: user.uid,
      };

      // Save to Firestore
      await setDoc(doc(db, "companies", user.uid), companyData);

      alert('Profile created successfully!');
      navigate('/industry/signin');
      // Reset form
      setFormData({
        companyName: '',
        industry: '',
        description: '',
        website: '',
        size: '',
        location: '',
        contactName: '',
        contactTitle: '',
        contactEmail: '',
        contactPhone: '',
        password: '',
        confirmPassword: '',
      });
      setCurrentStep(1);

    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Create Company Profile" />
      <div className="container mx-auto px-4  py-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {currentStep === 1 ? 'Company Registration' : 'Company Details'}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {currentStep === 1
                ? "Get started by creating your company account"
                : "Complete your company profile to access talent features"}
            </p>
            <div className="mt-4 text-slate-500">
              Step {currentStep} of 2
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {/* Left Column - Sidebar Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="relative h-[250px] rounded-xl overflow-hidden shadow-lg animate-fadeIn">
                <img
                  src={profileImg}
                  alt="Company profile creation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-slate-900/10"></div>
              </div>

              <Card className="animate-fadeIn [animation-delay:200ms]">
                <CardHeader>
                  <CardTitle>Registration Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${currentStep === 1 ? 'bg-slate-50' : ''}`}>
                    <div className="h-8 w-8 rounded-full bg-[#27ae60] text-white flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Account Setup</h3>
                      <p className="text-sm text-slate-600">Basic company information and credentials</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${currentStep === 2 ? 'bg-slate-50' : ''}`}>
                    <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Company Profile</h3>
                      <p className="text-sm text-slate-600">Detailed company information and contacts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <Card className="md:col-span-3 animate-fadeIn [animation-delay:400ms] shadow-lg">
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 ? 'Account Information' : 'Company Details'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1
                    ? "Create your company account credentials"
                    : "Complete your company profile details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={currentStep === 1 ? handleContinue : handleSubmit}>
                  {currentStep === 1 ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name*</label>
                        <input
                          id="companyName"
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          placeholder="Anischolar Career Hub"
                        />
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry*</label>
                        <select
                          id="industry"
                          required
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Company Email*</label>
                        <input
                          id="contactEmail"
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          placeholder="contact@company.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium mb-1">Password*</label>
                          <input
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password*</label>
                          <input
                            id="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Company Description*</label>
                        <textarea
                          id="description"
                          rows={3}
                          required
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          placeholder="Tell us about your company mission and culture..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium mb-1">Website URL</label>
                          <input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="https://www.example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="size" className="block text-sm font-medium mb-1">Company Size*</label>
                          <select
                            id="size"
                            required
                            value={formData.size}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          >
                            <option value="">Select Size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-1">Headquarters Location*</label>
                        <input
                          id="location"
                          type="text"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contactName" className="block text-sm font-medium mb-1">Contact Name*</label>
                          <input
                            id="contactName"
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="contactTitle" className="block text-sm font-medium mb-1">Job Title*</label>
                          <input
                            id="contactTitle"
                            type="text"
                            required
                            value={formData.contactTitle}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            placeholder="Hiring Manager"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                          placeholder="+256 701234567"
                        />
                      </div>
                    </div>
                  )}

                  {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                  <div className="pt-6 flex gap-4">
                    {currentStep === 2 && (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="bg-slate-200 text-slate-800 hover:bg-slate-300"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                    )}

                    <Button
                      type="submit"
                      className="hover-lift bg-[#27ae60] hover:bg-[#5db381] text-white flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        'Processing...'
                      ) : currentStep === 1 ? (
                        <>
                          Continue
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      ) : (
                        'Create Profile'
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-sm text-slate-600 mt-4">
                    Already have an account?{" "}
                    <Link
                      to="/industry/signin"
                      className="text-[#27ae60] hover:underline"
                    >
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyProfile;