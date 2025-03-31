
// import React, { useState } from 'react';
// import { Button } from "../../../components/industryComponents/ui/button";
// import { Input } from "../../../components/industryComponents/ui/input";
// import { Textarea } from "../../../components/industryComponents/ui/textarea";

// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 
//   "../../../components/industryComponents/ui/card";
// import { Label } from "../../../components/industryComponents/ui/label";

// import { generateCoverLetter, saveGeneratedLetter, coverLetterTips, expandContentWithAI } from '../../../lib/coverLetterGenerator';
// import { Badge } from "../../../components/industryComponents/ui/badge";
// import { Plus, X, ArrowRight, Loader2, Wand2 } from 'lucide-react';
// import { Separator } from "../../../components/industryComponents/ui/separator";
// import AnimatedTransition from './AnimatedTransition';
// import { useToast } from "../../../hooks/use-toast";

// interface CoverLetterFormProps {
//   onLetterGenerated: (content: string) => void;
// }

// const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ onLetterGenerated }) => {
//   const { toast } = useToast();
//   const [step, setStep] = useState(1);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isExpanding, setIsExpanding] = useState<{
//     whyInterested: boolean;
//     achievements: boolean;
//   }>({
//     whyInterested: false,
//     achievements: false
//   });
//   const [formData, setFormData] = useState<FormData>({
//     fullName: '',
//     email: '',
//     phone: '',
//     jobTitle: '',
//     company: '',
//     skills: [],
//     experience: '',
//     education: '',
//     achievements: '',
//     whyInterested: '',
//     additionalInfo: ''
//   });
//   const [currentSkill, setCurrentSkill] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const addSkill = () => {
//     if (currentSkill.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         skills: [...prev.skills, currentSkill.trim()]
//       }));
//       setCurrentSkill('');
//     }
//   };

//   const removeSkill = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: prev.skills.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSkillKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addSkill();
//     }
//   };

//   const handleNext = () => {
//     if (validateCurrentStep()) {
//       setStep(prev => prev + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleBack = () => {
//     setStep(prev => prev - 1);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const validateCurrentStep = () => {
//     if (step === 1) {
//       if (!formData.fullName || !formData.email || !formData.phone) {
//         toast({
//           title: "Missing information",
//           description: "Please fill in all required fields",
//           variant: "destructive"
//         });
//         return false;
//       }
//     } else if (step === 2) {
//       if (!formData.jobTitle || !formData.company) {
//         toast({
//           title: "Missing information",
//           description: "Please enter the job title and company name",
//           variant: "destructive"
//         });
//         return false;
//       }
//     } else if (step === 3) {
//       if (formData.skills.length === 0 || !formData.experience) {
//         toast({
//           title: "Missing information",
//           description: "Please add your skills and experience",
//           variant: "destructive"
//         });
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleGenerateLetter = async () => {
//     if (validateCurrentStep()) {
//       setIsGenerating(true);
//       try {
//         const generatedLetter = await generateCoverLetter(formData);
//         saveGeneratedLetter(generatedLetter);
//         onLetterGenerated(generatedLetter.content);
//         toast({
//           title: "Success!",
//           description: "Your cover letter has been generated"
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to generate your cover letter",
//           variant: "destructive"
//         });
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const handleExpandContent = async (field: 'whyInterested' | 'achievements') => {
//     // Only expand if there's a minimal amount of base content to work with
//     // or if the field is completely empty
//     const currentContent = formData[field];
    
//     setIsExpanding(prev => ({ ...prev, [field]: true }));
    
//     try {
//       const response = await expandContentWithAI({
//         field,
//         currentValue: currentContent,
//         jobTitle: formData.jobTitle,
//         company: formData.company,
//         skills: formData.skills
//       });
      
//       setFormData(prev => ({
//         ...prev,
//         [field]: response.expandedContent
//       }));
      
//       toast({
//         title: "Content expanded!",
//         description: `Your ${field === 'whyInterested' ? 'interest statement' : 'achievements'} have been enhanced with AI suggestions.`,
//       });
//     } catch (error) {
//       toast({
//         title: "Expansion failed",
//         description: "Sorry, we couldn't expand your content right now.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsExpanding(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const renderFormStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <AnimatedTransition show={step === 1} animation="fade">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input 
//                   id="fullName" 
//                   name="fullName" 
//                   value={formData.fullName} 
//                   onChange={handleChange} 
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input 
//                   id="email" 
//                   name="email" 
//                   type="email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   placeholder="john.doe@example.com"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone</Label>
//                 <Input 
//                   id="phone" 
//                   name="phone" 
//                   value={formData.phone} 
//                   onChange={handleChange} 
//                   placeholder="(123) 456-7890"
//                   required
//                 />
//               </div>
//             </div>
//           </AnimatedTransition>
//         );
//       case 2:
//         return (
//           <AnimatedTransition show={step === 2} animation="fade">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="jobTitle">Job Title</Label>
//                 <Input 
//                   id="jobTitle" 
//                   name="jobTitle" 
//                   value={formData.jobTitle} 
//                   onChange={handleChange} 
//                   placeholder="Software Engineer"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="company">Company</Label>
//                 <Input 
//                   id="company" 
//                   name="company" 
//                   value={formData.company} 
//                   onChange={handleChange} 
//                   placeholder="Tech Company Inc."
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="whyInterested">Why are you interested in this position?</Label>
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     size="sm" 
//                     className="flex items-center gap-1 h-8" 
//                     onClick={() => handleExpandContent('whyInterested')}
//                     disabled={isExpanding.whyInterested}
//                   >
//                     {isExpanding.whyInterested ? (
//                       <>
//                         <Loader2 className="h-3 w-3 animate-spin" />
//                         <span className="text-xs">Enhancing...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Wand2 className="h-3 w-3" />
//                         <span className="text-xs">Enhance with AI</span>
//                       </>
//                     )}
//                   </Button>
//                 </div>
//                 <Textarea 
//                   id="whyInterested" 
//                   name="whyInterested" 
//                   value={formData.whyInterested} 
//                   onChange={handleChange} 
//                   placeholder="Explain why you're interested in this role and company..."
//                   rows={4}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Write a brief statement or click "Enhance with AI" to generate detailed content.
//                 </p>
//               </div>
//             </div>
//           </AnimatedTransition>
//         );
//       case 3:
//         return (
//           <AnimatedTransition show={step === 3} animation="fade">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Skills</Label>
//                 <div className="flex gap-2">
//                   <Input 
//                     value={currentSkill} 
//                     onChange={(e) => setCurrentSkill(e.target.value)} 
//                     onKeyDown={handleSkillKeyDown}
//                     placeholder="Add a skill (e.g., JavaScript, Project Management)"
//                   />
//                   <Button type="button" onClick={addSkill} size="icon">
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.skills.map((skill, index) => (
//                     <Badge key={index} className="flex items-center gap-1 py-1">
//                       {skill}
//                       <button 
//                         type="button" 
//                         onClick={() => removeSkill(index)}
//                         className="ml-1 rounded-full hover:bg-accent/20 p-1"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="experience">Professional Experience</Label>
//                 <Textarea 
//                   id="experience" 
//                   name="experience" 
//                   value={formData.experience} 
//                   onChange={handleChange} 
//                   placeholder="Briefly describe your relevant work experience..."
//                   rows={4}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="education">Education</Label>
//                 <Textarea 
//                   id="education" 
//                   name="education" 
//                   value={formData.education} 
//                   onChange={handleChange} 
//                   placeholder="Your educational background..."
//                   rows={2}
//                 />
//               </div>
//             </div>
//           </AnimatedTransition>
//         );
//       case 4:
//         return (
//           <AnimatedTransition show={step === 4} animation="fade">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="achievements">Key Achievements</Label>
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     size="sm" 
//                     className="flex items-center gap-1 h-8" 
//                     onClick={() => handleExpandContent('achievements')}
//                     disabled={isExpanding.achievements}
//                   >
//                     {isExpanding.achievements ? (
//                       <>
//                         <Loader2 className="h-3 w-3 animate-spin" />
//                         <span className="text-xs">Enhancing...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Wand2 className="h-3 w-3" />
//                         <span className="text-xs">Enhance with AI</span>
//                       </>
//                     )}
//                   </Button>
//                 </div>
//                 <Textarea 
//                   id="achievements" 
//                   name="achievements" 
//                   value={formData.achievements} 
//                   onChange={handleChange} 
//                   placeholder="List some notable achievements or projects that demonstrate your capabilities..."
//                   rows={4}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Add key achievements or use AI to help create professional bullet points based on your experience.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
//                 <Textarea 
//                   id="additionalInfo" 
//                   name="additionalInfo" 
//                   value={formData.additionalInfo} 
//                   onChange={handleChange} 
//                   placeholder="Anything else you'd like to include in your cover letter..."
//                   rows={4}
//                 />
//               </div>
              
//               <div className="mt-6 pt-4 border-t">
//                 <h3 className="text-sm font-medium mb-2">Cover Letter Tips</h3>
//                 <ul className="space-y-2 text-sm text-muted-foreground">
//                   {coverLetterTips.slice(0, 3).map((tip, index) => (
//                     <li key={index} className="flex gap-2">
//                       <span className="text-primary">•</span> 
//                       <span><span className="font-medium">{tip.title}:</span> {tip.description}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </AnimatedTransition>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
//       <CardHeader className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 mask-radial-faded"></div>
//         <div className="relative z-10">
//           <CardTitle className="text-2xl font-bold">Create Your Cover Letter</CardTitle>
//           <CardDescription>
//             Step {step} of 4: {
//               step === 1 ? 'Personal Information' :
//               step === 2 ? 'Job Details' :
//               step === 3 ? 'Skills & Experience' :
//               'Achievements & Finishing Touches'
//             }
//           </CardDescription>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-6">
//           <div className="w-full flex justify-between mb-2">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="flex flex-col items-center">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                   i < step ? 'bg-primary text-primary-foreground' : 
//                   i === step ? 'bg-primary/20 text-primary border border-primary' : 
//                   'bg-secondary text-muted-foreground'
//                 }`}>
//                   {i < step ? '✓' : i}
//                 </div>
//                 <span className={`text-xs mt-1 ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
//                   {i === 1 ? 'Info' : 
//                    i === 2 ? 'Job' : 
//                    i === 3 ? 'Skills' : 'Final'}
//                 </span>
//               </div>
//             ))}
//           </div>
          
//           <div className="relative h-2 bg-secondary rounded-full">
//             <div 
//               className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
//               style={{ width: `${(step - 1) * 33.33}%` }}
//             />
//           </div>
//         </div>
        
//         {renderFormStep()}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         {step > 1 ? (
//           <Button 
//             variant="outline" 
//             onClick={handleBack}
//           >
//             Back
//           </Button>
//         ) : <div></div>}
        
//         {step < 4 ? (
//           <Button 
//             onClick={handleNext}
//             className="ml-auto"
//           >
//             Next <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         ) : (
//           <Button 
//             onClick={handleGenerateLetter}
//             disabled={isGenerating}
//             className="ml-auto"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               <>Generate Cover Letter</>
//             )}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default CoverLetterForm;
