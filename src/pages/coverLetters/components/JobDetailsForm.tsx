
import React, { useState } from 'react';
import { Button } from "../../../components/industryComponents/ui/button";
import { Input } from "../../../components/industryComponents/ui/input";
import { Textarea } from "../../../components/industryComponents/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from
  "../../../components/industryComponents/ui/card";
import { Label } from "../../../components/industryComponents/ui/label";
import { generateCoverLetterFromProfile, getMockUserProfile, expandContentWithAI } from '../../../lib/coverLetterGenerator';
import { ArrowRight, Loader2, Wand2 } from 'lucide-react';
import { Separator } from "../../../components/industryComponents/ui/separator";
import AnimatedTransition from './AnimatedTransition';
import { ToastContainer, toast } from 'react-toastify';

interface JobDetailsFormProps {
  onLetterGenerated: (content: string) => void;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  interests: string[];
  achievements: string;
}

interface JobApplicationData {
  jobTitle: string;
  company: string;
  whyInterested: string;
  additionalInfo?: string;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onLetterGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isAchievementExpanding, setIsAchievementExpanding] = useState(false);
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<JobApplicationData>({
    jobTitle: '',
    company: '',
    whyInterested: '',
    additionalInfo: ''
  });
  const [achievementsData, setAchievementsData] = useState({
    achievements: '',
    additionalInfo: ''
  });

  // In a real app, we would fetch this from your platform
  const userProfile: UserProfile = getMockUserProfile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleAchievementsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAchievementsData(prev => ({ ...prev, [name]: value }));
  };

  const handleExpandWhyInterested = async () => {
    if (!jobData.jobTitle || !jobData.company) {
      toast.info("Please enter the job title and company name first");
      return;
    }

    setIsExpanding(true);

    try {
      const response = await expandContentWithAI({
        field: 'whyInterested',
        currentValue: jobData.whyInterested,
        jobTitle: jobData.jobTitle,
        company: jobData.company,
        skills: userProfile.skills
      });

      setJobData(prev => ({
        ...prev,
        whyInterested: response.expandedContent
      }));

      toast.info("Content expanded successfully");
    } catch (error) {
      toast.error("Failed to expand content");
    } finally {
      setIsExpanding(false);
    }
  };

  const handleExpandAchievements = async () => {
    if (!jobData.jobTitle || !jobData.company) {
      toast.info("Please enter the job title and company name first");
      return;
    }

    setIsAchievementExpanding(true);

    try {
      const response = await expandContentWithAI({
        field: 'achievements',
        currentValue: achievementsData.achievements,
        jobTitle: jobData.jobTitle,
        company: jobData.company,
        skills: userProfile.skills

      });

      setAchievementsData(prev => ({
        ...prev,
        achievements: response.expandedContent
      }));

      toast.info("Content expanded successfully");
    } catch (error) {
      toast.error("Failed to expand content");
    } finally {
      setIsAchievementExpanding(false);
    }
  };


  const validateForm = () => {
    if (!jobData.jobTitle || !jobData.company) {
      toast.info("Please enter the job title and company name");
      return false;
    }
    return true;
  };

  const handleGenerateLetter = async () => {
    if (validateForm()) {
      setIsGenerating(true);
      try {
        // Generate using the user profile and job data
        const generatedLetter = await generateCoverLetterFromProfile(userProfile, jobData, achievementsData);

        // Save the letter
        // In a real app, you would save this to your platform's database
        onLetterGenerated(generatedLetter.content);

        toast.success("Cover letter generated successfully");
      } catch (error) {
        toast.error("Failed to generate cover letter");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep(prev => prev + 1);

    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!jobData.jobTitle || !jobData.company) {
        toast.info("Please enter the job title and company name");
        return false;
      }
    }
    return true;
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <AnimatedTransition show={true} animation="fade">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  placeholder="Tech Company Inc."
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whyInterested">Why are you interested in this position?</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8"
                    onClick={handleExpandWhyInterested}
                    disabled={isExpanding}
                  >
                    {isExpanding ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs">Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3 w-3" />
                        <span className="text-xs">Generate with AI</span>
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="whyInterested"
                  name="whyInterested"
                  value={jobData.whyInterested}
                  onChange={handleChange}
                  placeholder="Explain why you're interested in this role and company..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Write a brief statement or click "Generate with AI" to create detailed content.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={jobData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Anything else you'd like to include in your cover letter..."
                  rows={4}
                />
              </div>

            </div>
          </AnimatedTransition>
        );
      case 2:
        return (
          <AnimatedTransition show={step === 2} animation="fade">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8"
                    onClick={handleExpandAchievements}
                    disabled={isAchievementExpanding}
                  >
                    {isAchievementExpanding ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs">Enhancing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3 w-3" />
                        <span className="text-xs">Enhance with AI</span>
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="achievements"
                  name="achievements"
                  value={achievementsData.achievements}
                  onChange={handleAchievementsChange}
                  placeholder="List some notable achievements or projects that demonstrate your capabilities..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Add key achievements or use AI to help create professional bullet points based on your experience.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={achievementsData.additionalInfo}
                  onChange={handleAchievementsChange}
                  placeholder="Anything else you'd like to include in your cover letter..."
                  rows={4}
                />
              </div>
            </div>
          </AnimatedTransition>
        );
      default:
        return null;
    }
  };


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#27ae60]/10 to-accent/10 mask-radial-faded"></div>
        <div className="relative z-10">

          <CardTitle className="text-2xl font-bold">Create Your Cover Letter</CardTitle>
          <CardDescription>
            Step {step} of 2: {
              step === 1 ? 'Job Details' :
                'Achievements & Finishing Touches'

            }
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="w-full flex justify-between mb-2">
            {[1, 2].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < step ? 'text-white bg-[#27ae60]' :
                  i === step ? ' bg-[#27ae60]/10 border border-[#27ae60]' :
                    'bg-[#27ae60]/10 text-muted-foreground'
                  }`}>
                  {i < step ? '✓' : i}
                </div>
                <span className={`text-xs mt-1 ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {i === 1 ? 'Job' : 'Final'}
                </span>
              </div>
            ))}
          </div>

          <div className="relative h-2 bg-[#27ae60]/10 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#27ae60] rounded-full transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            />
          </div>
        </div>

        {renderFormStep()}
        <div className="p-4 bg-[#27ae60]/10 rounded-lg mt-6">
          <h3 className="text-sm mb-2 font-bold">Your Profile Information</h3>
          <p className="text-xs text-muted-foreground mb-3">
            This information from your profile will be used to generate your cover letter:
          </p>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {userProfile?.fullName}</p>
            <p><span className="font-medium">Email:</span> {userProfile?.email}</p>
            <p><span className="font-medium">Skills:</span> {userProfile?.skills?.join(', ')}</p>
            <p><span className="font-medium">Education:</span> {userProfile?.education}</p>
            <p><span className="font-medium">Experience:</span> {userProfile?.experience}</p>
          </div>
        </div>
      </CardContent>

      {/* <CardContent>
        <AnimatedTransition show={true} animation="fade">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                name="jobTitle" 
                value={jobData.jobTitle} 
                onChange={handleChange} 
                placeholder="Software Engineer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                value={jobData.company} 
                onChange={handleChange} 
                placeholder="Tech Company Inc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="whyInterested">Why are you interested in this position?</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 h-8" 
                  onClick={handleExpandWhyInterested}
                  disabled={isExpanding}
                >
                  {isExpanding ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-3 w-3" />
                      <span className="text-xs">Generate with AI</span>
                    </>
                  )}
                </Button>
              </div>
              <Textarea 
                id="whyInterested" 
                name="whyInterested" 
                value={jobData.whyInterested} 
                onChange={handleChange} 
                placeholder="Explain why you're interested in this role and company..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Write a brief statement or click "Generate with AI" to create detailed content.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                value={jobData.additionalInfo} 
                onChange={handleChange} 
                placeholder="Anything else you'd like to include in your cover letter..."
                rows={4}
              />
            </div>
            
            <div className="p-4 bg-accent/10 rounded-lg mt-6">
              <h3 className="text-sm font-medium mb-2">Your Profile Information</h3>
              <p className="text-xs text-muted-foreground mb-3">
                This information from your profile will be used to generate your cover letter:
              </p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {userProfile?.fullName}</p>
                <p><span className="font-medium">Email:</span> {userProfile?.email}</p>
                <p><span className="font-medium">Skills:</span> {userProfile?.skills.join(', ')}</p>
                <p><span className="font-medium">Education:</span> {userProfile?.education}</p>
                <p><span className="font-medium">Experience:</span> {userProfile?.experience}</p>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </CardContent> */}

      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
        ) : <div></div>}

        {step < 2 ? (
          <Button
            onClick={handleNext}
            className="ml-auto text-white bg-[#27ae60]"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleGenerateLetter}
            disabled={isGenerating}
            className="ml-auto text-white bg-[#27ae60]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>Generate Cover Letter</>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobDetailsForm;
