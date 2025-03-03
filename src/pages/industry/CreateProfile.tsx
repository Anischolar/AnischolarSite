
import React from "react";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Building, FilePlus, User, ArrowRight } from "lucide-react";
import Header from "../../components/Header";


const CreateProfile = () => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   alert('Profile created successfully')
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <Header title="Create Profile" title2=""/>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Create Your Company Profile
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Build your presence on our platform to attract and connect with talented students 
              who match your organization's needs.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {/* Left Column - Sidebar Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="relative h-[250px] rounded-xl overflow-hidden shadow-lg animate-fadeIn">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Person using laptop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-slate-900/10"></div>
              </div>
              
              <Card className="animate-fadeIn [animation-delay:200ms]">
                <CardHeader>
                  <CardTitle>Why Create a Profile?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-6 w-6 text-slate-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Showcase Your Company</h3>
                      <p className="text-sm text-slate-600">Highlight your culture and opportunities to attract the right talent.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-6 w-6 text-slate-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Access Talent Pool</h3>
                      <p className="text-sm text-slate-600">Connect with students from top universities based on your criteria.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FilePlus className="h-6 w-6 text-slate-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Post Opportunities</h3>
                      <p className="text-sm text-slate-600">Create internships, projects, and job listings for qualified students.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Form */}
            <Card className="md:col-span-3 animate-fadeIn [animation-delay:400ms] shadow-lg">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Tell us about your organization to help us connect you with relevant students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name*</label>
                      <input 
                        id="companyName" 
                        type="text" 
                        required
                        className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        placeholder="Anischolar Career Hub"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry*</label>
                      <select 
                        id="industry" 
                        required
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
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Company Description*</label>
                    <textarea 
                      id="description" 
                      rows={3}
                      required
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="Tell us about your company, mission, and culture..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-1">Website URL</label>
                      <input 
                        id="website" 
                        type="url" 
                        className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        placeholder="https://www.example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium mb-1">Company Size*</label>
                      <select 
                        id="size" 
                        required
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
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <hr className="my-4" />
                  
                  <h3 className="font-semibold">Primary Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium mb-1">Contact Name*</label>
                      <input 
                        id="contactName" 
                        type="text" 
                        required
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
                        className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        placeholder="Hiring Manager"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Email Address*</label>
                      <input 
                        id="contactEmail" 
                        type="email" 
                        required
                        className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">Phone Number</label>
                      <input 
                        id="contactPhone" 
                        type="tel" 
                        className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        placeholder="+256 701234567"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full hover-lift bg-[#27ae60] hover:bg-[#5db381] text-white">
                      Create Profile
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
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

export default CreateProfile;
