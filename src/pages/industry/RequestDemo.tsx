
import React from "react";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Mail, Building, Info, ArrowRight } from "lucide-react";
import Header from "../../components/Header";

const RequestDemo = () => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Demo request submitted')
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <Header title="Request demo" title2="" />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Experience the Platform in Action
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how our platform can help your organization connect with top student talent. 
              Schedule a personalized demo with our team.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            {/* Left Column - Form */}
            <Card className="animate-fadeIn shadow-lg">
              <CardHeader>
                <CardTitle>Request Your Demo</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will contact you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      id="name" 
                      type="text" 
                      required
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Business Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      required
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
                    <input 
                      id="company" 
                      type="text" 
                      required
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="Acme Inc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="+256 701234567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400" 
                      placeholder="Tell us about your specific needs and interests..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full hover-lift bg-[#27ae60] hover:bg-[#5db381] text-white">
                    Submit Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Right Column - Image and Info */}
            <div className="space-y-8">
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg animate-fadeIn [animation-delay:200ms]">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Person using laptop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-slate-900/0"></div>
              </div>
              
              <div className="space-y-6 animate-fadeIn [animation-delay:400ms]">
                <div className="flex items-start gap-3">
                  <Mail className="h-8 w-8 text-slate-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Personalized Presentation</h3>
                    <p className="text-slate-600">Get a tailored walkthrough of our platform focused on your industry's needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building className="h-8 w-8 text-slate-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Industry-Specific Solutions</h3>
                    <p className="text-slate-600">Learn how organizations like yours leverage our platform successfully.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-8 w-8 text-slate-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Ask Questions</h3>
                    <p className="text-slate-600">Direct access to our experts to address your specific questions and concerns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;
