import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Input } from "../../components/industryComponents/ui/input";
import { Label } from "../../components/industryComponents/ui/label";
import { Textarea } from "../../components/industryComponents/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/industryComponents/ui/select";
import { ArrowLeft, Briefcase, Plus } from "lucide-react";

const JobPosting = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("full-time");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  // Dummy data for existing job postings
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "Software Engineer Intern",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      type: "internship",
      description: "Join our engineering team for a summer internship opportunity.",
      requirements: "Computer Science student, knowledge of JavaScript, React experience a plus.",
      postedDate: "2023-07-15",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataCorp Solutions",
      location: "Remote",
      type: "full-time",
      description: "Looking for a full-time data analyst to join our growing team.",
      requirements: "Bachelor's degree in related field, 2+ years experience with SQL and data visualization tools.",
      postedDate: "2023-08-02",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new job posting
    const newJob = {
      id: jobPostings.length + 1,
      title,
      company,
      location,
      type,
      description,
      requirements,
      postedDate: new Date().toISOString().split('T')[0],
    };
    
    // Add to list and reset form
    setJobPostings([...jobPostings, newJob]);
    
    // Reset form
    setTitle("");
    setCompany("");
    setLocation("");
    setType("full-time");
    setDescription("");
    setRequirements("");
    
    // Show success message
    toast.success("Job opportunity posted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/industry">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
        <p className="text-slate-600 mb-8">Create and manage job and internship opportunities for students</p>
      </div>

      {/* Create new job posting form */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Create New Opportunity
          </CardTitle>
          <CardDescription>
            Post a new job or internship opportunity for students
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Software Engineer Intern" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  placeholder="Your company name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="e.g. San Francisco, CA or Remote" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Opportunity Type</Label>
                <Select 
                  value={type} 
                  onValueChange={setType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe the role, responsibilities, and what students can expect"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea 
                id="requirements" 
                value={requirements} 
                onChange={(e) => setRequirements(e.target.value)} 
                placeholder="List skills, qualifications, and experience needed"
                rows={3}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#27ae60] text-white" type="submit">Post Opportunity</Button>
          </CardFooter>
        </form>
      </Card>

      {/* List of existing job postings */}
      <h2 className="text-2xl font-semibold mb-4">Your Posted Opportunities</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {jobPostings.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company} • {job.location}</CardDescription>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span className="text-sm capitalize">{job.type}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold">Description</h4>
                  <p className="text-sm text-slate-600">{job.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Requirements</h4>
                  <p className="text-sm text-slate-600">{job.requirements}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-slate-500">
              <span>Posted: {job.postedDate}</span>
              <Link to={`/industry/applications?jobId=${job.id}`} className="text-[#27ae60] hover:underline">
                View Applications
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobPosting;
