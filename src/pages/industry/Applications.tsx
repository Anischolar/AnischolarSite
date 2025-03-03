import React from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/industryComponents/ui/table";
import { ArrowLeft, Eye, User, File, Briefcase, List } from "lucide-react";

// Define the application type
type Application = {
  id: number;
  jobId: number;
  jobTitle: string;
  studentName: string;
  email: string;
  university: string;
  gradYear: string;
  coverLetter: string;
  resume: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  submittedDate: string;
};

const Applications = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId") ? parseInt(searchParams.get("jobId") || "0") : null;

  // Dummy data for applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      jobId: 1,
      jobTitle: "Software Engineer Intern",
      studentName: "Emma Johnson",
      email: "emma.johnson@university.edu",
      university: "Stanford University",
      gradYear: "2025",
      coverLetter: "I am excited to apply for the Software Engineer Intern role at your company. My experience with React and TypeScript makes me a great fit for this position.",
      resume: "resume_emma_johnson.pdf",
      status: "reviewed",
      submittedDate: "2023-07-20"
    },
    {
      id: 2,
      jobId: 1,
      jobTitle: "Software Engineer Intern",
      studentName: "Michael Chen",
      email: "michael.chen@university.edu",
      university: "MIT",
      gradYear: "2024",
      coverLetter: "As a Computer Science student at MIT, I've completed several projects using JavaScript and React that align with your internship requirements.",
      resume: "resume_michael_chen.pdf",
      status: "pending",
      submittedDate: "2023-07-25"
    },
    {
      id: 3,
      jobId: 2,
      jobTitle: "Data Analyst",
      studentName: "Sophia Rodriguez",
      email: "sophia@university.edu",
      university: "UC Berkeley",
      gradYear: "2023",
      coverLetter: "With my background in data science and experience with SQL and Tableau, I believe I would be a valuable addition to your team.",
      resume: "resume_sophia_rodriguez.pdf",
      status: "accepted",
      submittedDate: "2023-08-05"
    },
    {
      id: 4,
      jobId: 2,
      jobTitle: "Data Analyst",
      studentName: "James Wilson",
      email: "james.wilson@university.edu",
      university: "UCLA",
      gradYear: "2023",
      coverLetter: "I'm applying for the Data Analyst position with 3 years of experience in SQL and Power BI development.",
      resume: "resume_james_wilson.pdf",
      status: "rejected",
      submittedDate: "2023-08-10"
    }
  ]);

  // Filter applications based on job ID if provided
  const filteredApplications = jobId 
    ? applications.filter(app => app.jobId === jobId)
    : applications;

  // State for currently viewed application
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Function to update application status
  const updateStatus = (appId: number, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const getStatusBadgeClass = (status: Application['status']) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-blue-100 text-blue-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/industry/job-posting">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Opportunities
          </Link>
        </Button>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">Student Applications</h1>
          {jobId && (
            <Button variant="outline" asChild>
              <Link to="/applications">
                <List className="mr-2 h-4 w-4" />
                View All Applications
              </Link>
            </Button>
          )}
        </div>
        <p className="text-slate-600 mb-8">
          {jobId 
            ? `Viewing applications for ${filteredApplications[0]?.jobTitle || "job"}`
            : "Review and manage all student applications"
          }
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Applications list */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Applications ({filteredApplications.length})
              </CardTitle>
              <CardDescription>
                Click on an application to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <TableRow key={app.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedApplication(app)}>
                          <TableCell className="font-medium">{app.studentName}</TableCell>
                          <TableCell>{app.jobTitle}</TableCell>
                          <TableCell>{app.university}</TableCell>
                          <TableCell>{app.submittedDate}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(app.status)}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-slate-500">
                          No applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application details */}
        <div className="w-full lg:w-1/3">
          {selectedApplication ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      {selectedApplication.studentName}
                    </CardTitle>
                    <CardDescription>{selectedApplication.email}</CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(selectedApplication.status)}`}>
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Application Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-500">Position</p>
                      <p>{selectedApplication.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">University</p>
                      <p>{selectedApplication.university}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Graduation Year</p>
                      <p>{selectedApplication.gradYear}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Submitted On</p>
                      <p>{selectedApplication.submittedDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Cover Letter</h3>
                  <p className="text-sm text-slate-600 border rounded-md p-3 bg-slate-50">
                    {selectedApplication.coverLetter}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Resume</h3>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <File className="mr-2 h-4 w-4" />
                    {selectedApplication.resume}
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-1">Anischolar profile Link</h3>
                  <p className="text-sm text-slate-600 border rounded-md p-3 bg-slate-50 break-all ">
                  http://anischolar.com/profile/7KfecfwKzlSNvIGoWahFmYxBwXH2/view
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedApplication.status === "reviewed" ? "default" : "outline"}
                  onClick={() => updateStatus(selectedApplication.id, "reviewed")}
                >
                  Mark as Reviewed
                </Button>
                <Button
                  size="sm" 
                  variant={selectedApplication.status === "accepted" ? "default" : "outline"}
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => updateStatus(selectedApplication.id, "accepted")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant={selectedApplication.status === "rejected" ? "default" : "outline"}
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => updateStatus(selectedApplication.id, "rejected")}
                >
                  Reject
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-6 text-center border-dashed">
              <Eye className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Application Selected</h3>
              <p className="text-slate-500 mb-4">
                Click on an application from the list to view details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
