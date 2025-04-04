import { useEffect } from 'react';
import { useAuth } from '../authProvider';
import { FormData, GeneratedLetter, AIExpandRequestField, AIExpandResponse, UserProfile, JobApplicationData, AchievementData } from '../lib/types';
import {  getClosings, getOpenings} from './data';


// Mock user profile - in a real app, this would come from the platform
export const getMockUserProfile = (): UserProfile => {
  const { userInfo } = useAuth();
  useEffect(()=>{
    
  },[userInfo?.firstName])
  return {
    fullName: `${userInfo?.firstName} ${userInfo?.lastName}`,
    email: userInfo?.email,
    phone: userInfo?.phoneNumber,
    skills: userInfo?.skills?.map((skill: any) => skill.name),
    experience: userInfo?.experience?.map((exp: any) => `${exp.title} at ${exp.companyName}`).join(', '),
    education: userInfo?.education?.map((edu: any) => `${edu.degree} in ${edu.major} from ${edu.universityName}`).join(', '),
    interests: userInfo?.interests,
    achievements: userInfo?.achievements};
};



// Function to generate a unique cover letter using the user profile and job details
export const generateCoverLetterFromProfile = async (
  userProfile: UserProfile,
  jobData: JobApplicationData,
  achievementsData: AchievementData,
): Promise<GeneratedLetter> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate a unique ID
  const id = Math.random().toString(36).substring(2, 15);
  const today = new Date();

  // Format the date
  const dateStr = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate unique opening based on job title and company
  // const openings = [
  //   `I am writing to express my enthusiasm for the ${jobData.jobTitle} position at ${jobData.company}.`,
  //   `It is with great interest that I submit my application for the ${jobData.jobTitle} role at ${jobData.company}.`,
  //   `Having followed ${jobData.company}'s impressive growth, I am excited to apply for the ${jobData.jobTitle} position.`,
  //   `Your posting for a ${jobData.jobTitle} at ${jobData.company} immediately captured my attention as it aligns perfectly with my career goals.`,
  //   `As a professional with extensive experience in ${userProfile.skills[0]} and ${userProfile.skills[1]}, I am thrilled to apply for the ${jobData.jobTitle} position at ${jobData.company}.`
  // ];

  // Randomly select an opening to ensure uniqueness
  const randomOpening = getOpenings(userProfile, jobData);
 
  // Generate unique skill highlight based on user's skills and job title
  const skillHighlight = generateUniqueSkillHighlight(userProfile.skills, jobData.jobTitle, jobData.company);

  // Generate closing paragraph variations
  // const closings = [
  //   `I would welcome the opportunity to discuss how my background, skills and experience would be beneficial to ${jobData.company}. Thank you for considering my application.`,
  //   `I am excited about the possibility of bringing my unique perspective and expertise to ${jobData.company} and would appreciate the chance to discuss my qualifications further.`,
  //   `I believe my combination of skills and passion makes me an ideal candidate for this role. I look forward to the opportunity to contribute to ${jobData.company}'s continued success.`,
  //   `Thank you for considering my application. I am eager to explore how my background aligns with the goals of ${jobData.company} and would welcome a conversation at your convenience.`
  // ];

  const randomClosing = getClosings(jobData);

  // Build the content with uniqueness elements
  const content = `${dateStr}

${userProfile.fullName}
${userProfile.email}
${userProfile.phone}

${jobData.company} Hiring Manager
${jobData.company}

Dear Hiring Manager,

${randomOpening}

${jobData.whyInterested}

${skillHighlight}

My professional background includes:
${userProfile.experience}

My educational qualifications include:
${userProfile.education}

Key achievements that demonstrate my capability for this role:
${achievementsData.achievements}

${jobData.additionalInfo ? jobData.additionalInfo + '\n\n' : ''}${randomClosing}

Sincerely,
${userProfile.fullName}`;

  return {
    id,
    title: `Cover Letter for ${jobData.jobTitle} at ${jobData.company}`,
    content,
    createdAt: today
  };
};

// Helper function to generate unique skill highlights
const generateUniqueSkillHighlight = (skills: string[], jobTitle: string, company: string): string => {
  const jobTitleLower = jobTitle.toLowerCase();
  let relevantSkills: string[] = [];

  // Try to match skills that might be relevant to the job title
  if (jobTitleLower.includes('manage') || jobTitleLower.includes('direct')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('manage') ||
      skill.toLowerCase().includes('lead') ||
      skill.toLowerCase().includes('strategic') ||
      skill.toLowerCase().includes('operations')
    );
  } else if (jobTitleLower.includes('develop') || jobTitleLower.includes('engineer')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('develop') ||
      skill.toLowerCase().includes('technical') ||
      skill.toLowerCase().includes('programming') ||
      skill.toLowerCase().includes('software')
    );
  } else if (jobTitleLower.includes('analys')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('analy') ||
      skill.toLowerCase().includes('data') ||
      skill.toLowerCase().includes('research') ||
      skill.toLowerCase().includes('statistics')
    );
  } else if (jobTitleLower.includes('doctor') || jobTitleLower.includes('physician') || jobTitleLower.includes('surgeon')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('medical') ||
      skill.toLowerCase().includes('diagnosis') ||
      skill.toLowerCase().includes('treatment') ||
      skill.toLowerCase().includes('patient care')
    );
  } else if (jobTitleLower.includes('nurse') || jobTitleLower.includes('healthcare')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('nursing') ||
      skill.toLowerCase().includes('patient care') ||
      skill.toLowerCase().includes('emergency') ||
      skill.toLowerCase().includes('medical')
    );
  } else if (jobTitleLower.includes('vet') || jobTitleLower.includes('veterinary')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('animal care') ||
      skill.toLowerCase().includes('diagnosis') ||
      skill.toLowerCase().includes('surgery') ||
      skill.toLowerCase().includes('clinical')
    );
  } else if (jobTitleLower.includes('survey') || jobTitleLower.includes('researcher')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('survey design') ||
      skill.toLowerCase().includes('data collection') ||
      skill.toLowerCase().includes('analysis') ||
      skill.toLowerCase().includes('research methods')
    );
  } else if (jobTitleLower.includes('teacher') || jobTitleLower.includes('educator')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('teaching') ||
      skill.toLowerCase().includes('curriculum development') ||
      skill.toLowerCase().includes('student engagement') ||
      skill.toLowerCase().includes('education technology')
    );
  } else if (jobTitleLower.includes('finance') || jobTitleLower.includes('account') || jobTitleLower.includes('bank')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('financial analysis') ||
      skill.toLowerCase().includes('accounting') ||
      skill.toLowerCase().includes('budgeting') ||
      skill.toLowerCase().includes('investment')
    );
  } else if (jobTitleLower.includes('lawyer') || jobTitleLower.includes('legal') || jobTitleLower.includes('attorney')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('legal research') ||
      skill.toLowerCase().includes('litigation') ||
      skill.toLowerCase().includes('contracts') ||
      skill.toLowerCase().includes('compliance')
    );
  } else if (jobTitleLower.includes('marketing') || jobTitleLower.includes('brand')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('marketing strategy') ||
      skill.toLowerCase().includes('seo') ||
      skill.toLowerCase().includes('content creation') ||
      skill.toLowerCase().includes('social media')
    );
  } else if (jobTitleLower.includes('sales')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('sales strategy') ||
      skill.toLowerCase().includes('negotiation') ||
      skill.toLowerCase().includes('lead generation') ||
      skill.toLowerCase().includes('customer relationships')
    );
  } else if (jobTitleLower.includes('customer') || jobTitleLower.includes('support')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('customer service') ||
      skill.toLowerCase().includes('problem-solving') ||
      skill.toLowerCase().includes('communication') ||
      skill.toLowerCase().includes('client support')
    );
  } else if (jobTitleLower.includes('designer') || jobTitleLower.includes('ui') || jobTitleLower.includes('ux')) {
    relevantSkills = skills.filter(skill =>
      skill.toLowerCase().includes('graphic design') ||
      skill.toLowerCase().includes('ui/ux') ||
      skill.toLowerCase().includes('wireframing') ||
      skill.toLowerCase().includes('prototyping')
    );
  }

  // If no relevant skills were found, use a random selection
  if (relevantSkills.length === 0) {
    // Shuffle and take first 2-3 skills
    const shuffled = [...skills].sort(() => 0.5 - Math.random());
    relevantSkills = shuffled.slice(0, Math.min(3, shuffled.length));
  }

  const templates = [
    `I bring a strong combination of ${relevantSkills.join(', ')}, which I believe makes me an excellent fit for this role.`,
    `My expertise in ${relevantSkills.join(' and ')} aligns perfectly with the requirements of the ${jobTitle} position.`,
    `Throughout my career, I have developed proficiency in ${relevantSkills.join(', ')}, skills that would enable me to excel as a ${jobTitle} at ${skills.length > 3 ? 'your esteemed organization' : 'your company'}.`,
    `As someone who has honed their abilities in ${relevantSkills.join(' and ')}, I am confident in my capacity to contribute immediately to your team.`,
    `With a solid background in ${relevantSkills.join(', ')}, I am eager to leverage my expertise in the ${jobTitle} role.`,
    `Having developed strong capabilities in ${relevantSkills.join(' and ')}, I am excited about the opportunity to bring these skills to ${company}.`,
    `My extensive experience with ${relevantSkills.join(', ')} positions me well to succeed as a ${jobTitle} at ${company}.`,
    `I am particularly skilled in ${relevantSkills.join(', ')}, which I believe will allow me to add value to your team from day one.`,
    `The combination of my knowledge in ${relevantSkills.join(' and ')} and my ability to adapt quickly makes me a strong candidate for this position.`,
    `My professional background in ${relevantSkills.join(', ')} has equipped me with the tools necessary to thrive as a ${jobTitle} at ${company}.`,
    `Over the years, I have refined my expertise in ${relevantSkills.join(', ')}, making me a strong match for this role.`,
    `With hands-on experience in ${relevantSkills.join(' and ')}, I am confident in my ability to make meaningful contributions to ${company}.`,
    `I take pride in my ability to combine ${relevantSkills.join(', ')} to create effective solutions that align with the demands of this position.`,
    `My proficiency in ${relevantSkills.join(', ')} makes me well-equipped to take on the challenges of the ${jobTitle} role.`,
    `Leveraging my skills in ${relevantSkills.join(', ')}, I am eager to drive impactful results for ${company}.`,
    `I have successfully applied my expertise in ${relevantSkills.join(' and ')} to drive efficiency and effectiveness in previous roles.`,
    `My deep understanding of ${relevantSkills.join(', ')} positions me as an ideal candidate for this role at ${company}.`,
    `Combining my skills in ${relevantSkills.join(' and ')}, I am excited about the prospect of delivering exceptional results at ${company}.`,
    `Having worked extensively with ${relevantSkills.join(', ')}, I am well-prepared to contribute to ${company} in this capacity.`,
    `I am highly proficient in ${relevantSkills.join(', ')}, which aligns well with the needs of this role.`,
    `I am excited about the chance to apply my expertise in ${relevantSkills.join(', ')} to benefit ${company}.`,
    `With years of experience in ${relevantSkills.join(', ')}, I am confident in my ability to bring value to this role.`,
    `My knowledge and experience in ${relevantSkills.join(', ')} have prepared me to take on the challenges of this position effectively.`,
    `I have a strong foundation in ${relevantSkills.join(' and ')}, which enables me to adapt and excel in fast-paced environments like ${company}.`,
    `As a professional with extensive experience in ${relevantSkills.join(', ')}, I am well-positioned to succeed in this role.`,
    `I look forward to utilizing my expertise in ${relevantSkills.join(', ')} to support ${company} in achieving its goals.`,
    `My background in ${relevantSkills.join(', ')} allows me to bring a unique and valuable perspective to this role.`,
    `Equipped with a solid understanding of ${relevantSkills.join(' and ')}, I am eager to contribute to ${company} and its success.`,
    `I have a track record of applying my skills in ${relevantSkills.join(', ')} to drive tangible business results, making me an asset to your team.`,
    `I am eager to bring my deep knowledge in ${relevantSkills.join(', ')} to ${company} and help achieve outstanding outcomes.`
  ];
  

  return templates[Math.floor(Math.random() * templates.length)];
};

// Keep the original function for backward compatibility
// export const generateCoverLetter = async (formData: FormData): Promise<GeneratedLetter> => {
//   // Simulating API call delay
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   // Generate a unique ID
//   const id = Math.random().toString(36).substring(2, 15);
//   const today = new Date();

//   // Format the date
//   const dateStr = today.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   // Simple template-based generation
//   const content = `${dateStr}

// ${formData.fullName}
// ${formData.email}
// ${formData.phone}

// ${formData.company} Hiring Manager
// ${formData.company}

// Dear Hiring Manager,

// I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.company}. With my background in ${formData.experience} and expertise in ${formData.skills.join(', ')}, I am excited about the opportunity to contribute to your team.

// ${formData.whyInterested}

// My professional experience includes:
// ${formData.experience}

// My educational background in ${formData.education} has provided me with a solid foundation in this field.

// Some of my key achievements include:
// ${formData.achievements}

// ${formData.additionalInfo ? formData.additionalInfo + '\n\n' : ''}I am excited about the possibility of bringing my unique perspective and expertise to ${formData.company}. I would welcome the opportunity to discuss how my background, skills and experience would be beneficial to your organization.

// Thank you for considering my application. I look forward to the possibility of working with you and your team.

// Sincerely,
// ${formData.fullName}`;

//   return {
//     id,
//     title: `Cover Letter for ${formData.jobTitle} at ${formData.company}`,
//     content,
//     createdAt: today
//   };
// };

// Function to save generated letters to localStorage
export const saveGeneratedLetter = (letter: GeneratedLetter): void => {
  const savedLetters = getGeneratedLetters();
  const updatedLetters = [letter, ...savedLetters];
  localStorage.setItem('generatedLetters', JSON.stringify(updatedLetters));
};

// Function to get all generated letters from localStorage
export const getGeneratedLetters = (): GeneratedLetter[] => {
  const savedLetters = localStorage.getItem('generatedLetters');
  if (!savedLetters) return [];

  return JSON.parse(savedLetters).map((letter: any) => ({
    ...letter,
    createdAt: new Date(letter.createdAt)
  }));
};

// Function to get a specific letter by ID
export const getLetterById = (id: string): GeneratedLetter | undefined => {
  const savedLetters = getGeneratedLetters();
  return savedLetters.find(letter => letter.id === id);
};

// Function to delete a letter by ID
export const deleteLetterById = (id: string): void => {
  const savedLetters = getGeneratedLetters();
  const updatedLetters = savedLetters.filter(letter => letter.id !== id);
  localStorage.setItem('generatedLetters', JSON.stringify(updatedLetters));
};

// Function to expand content using AI
export const expandContentWithAI = async (request: AIExpandRequestField): Promise<AIExpandResponse> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let expandedContent = '';

  if (request.field === 'whyInterested') {
    // Generate expanded "Why Interested" content based on provided information
    expandedContent = generateWhyInterestedContent(request);
  } else if (request.field === 'achievements') {
    // Generate expanded "Achievements" content based on provided information
    expandedContent = generateAchievementsContent(request);
  }

  return { expandedContent };
};

// Helper function to generate "Why Interested" content
const generateWhyInterestedContent = (request: AIExpandRequestField): string => {
  const { currentValue, jobTitle, company, skills } = request;

  // Base content is what the user already provided
  let content = currentValue.trim();

  // If the content is very short or empty, generate more substantial content
  if (content.length < 50) {
    const skillsText = skills && skills.length > 0
      ? `skills in ${skills.slice(0, 3).join(', ')}`
      : 'diverse skill set';
      const whyInterestedContent = [
        `I am particularly excited about the ${jobTitle || 'position'} position at ${company || 'your company'} because it aligns perfectly with my career goals and ${skillsText}. The company's reputation for ${getCompanyStrength(company)} resonates with my professional values, and I believe I can make significant contributions to your team.

        What especially attracts me to this role is the opportunity to ${getRoleOpportunity(jobTitle)}. I am confident that my background has prepared me well for these challenges, and I'm eager to bring my unique perspective to your organization.`,
        `The ${jobTitle || 'position'} position at ${company || 'your company'} represents an exciting opportunity to apply my expertise in ${skillsText}. I admire ${company}'s commitment to ${getCompanyStrength(company)}, and I see this role as the perfect avenue to contribute meaningfully.
      
        I am particularly drawn to the chance to ${getRoleOpportunity(jobTitle)}, which aligns well with my career trajectory. My experience has equipped me with the skills necessary to excel in this role, and I am eager to bring fresh insights to your team.`,
    
        `Joining ${company || 'your company'} as a ${jobTitle || 'position'} excites me because of the alignment between my professional aspirations and ${getCompanyStrength(company)}. I am confident that my background in ${skillsText} will enable me to add value to your team.
      
        The prospect of ${getRoleOpportunity(jobTitle)} is particularly appealing, and I look forward to the possibility of making meaningful contributions to your organization.`,
    
        `The ${jobTitle || 'position'} role at ${company || 'your company'} is an ideal match for my skills and passion for ${skillsText}. I have long admired ${company}'s work in ${getCompanyStrength(company)} and would be thrilled to contribute to this legacy.
      
        This role presents an opportunity to ${getRoleOpportunity(jobTitle)}, which is exactly the kind of challenge I am seeking in my next career step. I am confident that my expertise and dedication will make a positive impact on your team.`,
    
        `I am eager to apply for the ${jobTitle || 'position'} position at ${company || 'your company'} because it provides an opportunity to align my professional growth with a company renowned for ${getCompanyStrength(company)}. My skills in ${skillsText} equip me to thrive in this role.
        What excites me most is the potential to ${getRoleOpportunity(jobTitle)}, a challenge that I am well-prepared to take on with enthusiasm and commitment.`,
    
        `The opportunity to work at ${company || 'your company'} as a ${jobTitle || 'position'} is incredibly exciting due to the company's strong reputation for ${getCompanyStrength(company)}. I am confident that my experience in ${skillsText} will allow me to contribute meaningfully.
      
        I am particularly motivated by the chance to ${getRoleOpportunity(jobTitle)}, which aligns perfectly with my professional aspirations and long-term career goals.`,
    
        `I am drawn to the ${jobTitle || 'position'} position at ${company || 'your company'} because of its perfect alignment with my expertise in ${skillsText} and my admiration for ${company}'s dedication to ${getCompanyStrength(company)}.
      
        The chance to ${getRoleOpportunity(jobTitle)} excites me, and I am eager to leverage my skills to support your organization's continued success.`,
    
        `Applying for the ${jobTitle || 'position'} position at ${company || 'your company'} is an exciting step in my career, as it presents the ideal opportunity to combine my skills in ${skillsText} with an organization known for ${getCompanyStrength(company)}.
      
        I look forward to the possibility of ${getRoleOpportunity(jobTitle)}, a challenge that fits well with my strengths and professional aspirations.`,
    
        `I am particularly interested in the ${jobTitle || 'position'} position at ${company || 'your company'} because of its alignment with my career goals and my admiration for ${getCompanyStrength(company)}. My experience in ${skillsText} positions me well for this role.
      
        The opportunity to ${getRoleOpportunity(jobTitle)} is exactly the type of challenge I am seeking in my next professional endeavor.`,
    
        `Joining ${company || 'your company'} as a ${jobTitle || 'position'} is an exciting prospect, given my passion for ${skillsText} and my appreciation for ${getCompanyStrength(company)}.
      
        The chance to ${getRoleOpportunity(jobTitle)} excites me, and I am eager to contribute my expertise to your team.`,
    
        `I have long admired ${company || 'your company'} for its reputation in ${getCompanyStrength(company)}, and the ${jobTitle || 'position'} position represents an exciting opportunity to be part of this dynamic organization.
      
        I am particularly enthusiastic about the prospect of ${getRoleOpportunity(jobTitle)}, and I am confident that my skills in ${skillsText} will enable me to excel in this role.`,
    
        `The ${jobTitle || 'position'} position at ${company || 'your company'} is an exciting opportunity for me to apply my knowledge in ${skillsText} while contributing to a company recognized for ${getCompanyStrength(company)}.
      
        I am particularly motivated by the prospect of ${getRoleOpportunity(jobTitle)}, which aligns well with my career aspirations and professional expertise.`,
    
        `I am excited about the ${jobTitle || 'position'} position at ${company || 'your company'} as it aligns with my expertise in ${skillsText} and my admiration for the company's impact in ${getCompanyStrength(company)}.
      
        The opportunity to ${getRoleOpportunity(jobTitle)} greatly appeals to me, and I am eager to bring my skills and experience to your team.`,
    
        `I am eager to apply for the ${jobTitle || 'position'} position at ${company || 'your company'} because of its alignment with my professional background and my respect for the company's work in ${getCompanyStrength(company)}.
      
        The chance to ${getRoleOpportunity(jobTitle)} excites me, and I am confident in my ability to contribute positively to your team.`,
    
        `The ${jobTitle || 'position'} at ${company || 'your company'} presents an opportunity to join an organization known for ${getCompanyStrength(company)} while leveraging my experience in ${skillsText}.
      
        I am particularly drawn to the chance to ${getRoleOpportunity(jobTitle)}, and I look forward to the possibility of bringing my expertise to your team.`,
    
        `I am excited to apply for the ${jobTitle || 'position'} role at ${company || 'your company'}, as it aligns well with my skills in ${skillsText} and my admiration for the company's mission in ${getCompanyStrength(company)}.
      
        The prospect of ${getRoleOpportunity(jobTitle)} is particularly appealing, and I am eager to explore this opportunity further.`,
    
        `I am highly interested in the ${jobTitle || 'position'} position at ${company || 'your company'} due to my passion for ${skillsText} and my respect for the company's contributions to ${getCompanyStrength(company)}.
      
        I look forward to the possibility of ${getRoleOpportunity(jobTitle)} and am confident that my expertise will make a valuable impact.`,
    
        `The opportunity to join ${company || 'your company'} as a ${jobTitle || 'position'} is an exciting one, as it allows me to contribute my skills in ${skillsText} while being part of a company known for ${getCompanyStrength(company)}.
      
        I am particularly drawn to the chance to ${getRoleOpportunity(jobTitle)}, and I am eager to bring my experience to your team.`,
    
        `I am eager to bring my expertise in ${skillsText} to ${company || 'your company'} as a ${jobTitle || 'position'} and contribute to an organization known for ${getCompanyStrength(company)}.
      
        The opportunity to ${getRoleOpportunity(jobTitle)} excites me, and I am confident that my background will allow me to succeed in this role.`,
    
      ];
      content = whyInterestedContent[Math.floor(Math.random() * whyInterestedContent.length)];

//     content = `I am particularly excited about the ${jobTitle || 'position'} position at ${company || 'your company'} because it aligns perfectly with my career goals and ${skillsText}. The company's reputation for ${getCompanyStrength(company)} resonates with my professional values, and I believe I can make significant contributions to your team.
    
// What especially attracts me to this role is the opportunity to ${getRoleOpportunity(jobTitle)}. I am confident that my background has prepared me well for these challenges, and I'm eager to bring my unique perspective to your organization.`;
  }
  // If there's already some content, enhance it
  else {
    const skillsText = skills && skills.length > 0
    ? `skills in ${skills.slice(0, 3).join(', ')}`
    : 'diverse skill set';
    const whyInterestedEnhancements = [
      `\n\nFurthermore, I admire ${company || 'your company'}'s commitment to innovation and excellence in the industry. The prospect of collaborating with your talented team on impactful projects is particularly motivating for me. I believe that my unique approach to ${jobTitle || 'this role'} can help drive success and create new opportunities for growth.`,
    
      `\n\nIn addition, I am drawn to ${company || 'your company'}'s reputation for fostering a culture of creativity and continuous improvement. The opportunity to contribute my expertise in ${skillsText} to such a forward-thinking team excites me, and I am confident that my skills will help drive meaningful results.`,
    
      `\n\nWhat excites me most about this opportunity is the chance to work in an environment that values ${getCompanyStrength(company)}. I am eager to collaborate with your team to innovate and contribute to ${company || 'your company'}’s ongoing success.`,
    
      `\n\nI am particularly impressed by ${company || 'your company'}'s dedication to ${getCompanyStrength(company)}, and I am excited about the possibility of bringing my insights and skills in ${skillsText} to your dynamic workplace.`,
    
      `\n\nBeyond the role itself, I deeply appreciate ${company || 'your company'}'s emphasis on ${getCompanyStrength(company)}. I am eager to contribute to an organization that aligns so well with my professional values and ambitions.`,
    
      `\n\nAdditionally, I am motivated by the prospect of engaging with a team that values innovation, collaboration, and excellence. I believe my ability to ${getRoleOpportunity(jobTitle)} will make a strong impact at ${company || 'your company'} and support its mission.`,
    
      `\n\nI admire ${company || 'your company'}'s leadership in ${getCompanyStrength(company)} and its commitment to continuous growth. I am confident that my experience in ${skillsText} will help drive new initiatives and contribute to the company's success.`,
    
      `\n\nThe idea of working alongside experienced professionals at ${company || 'your company'} is truly exciting. I thrive in environments where collaboration and creativity fuel success, and I am eager to bring my expertise to the team.`,
    
      `\n\nMoreover, I have great respect for ${company || 'your company'}'s impact on ${getCompanyStrength(company)}. I am excited about the chance to be part of a company that is shaping the future and look forward to contributing to its continued success.`,
    
      `\n\nI am particularly drawn to ${company || 'your company'}'s forward-thinking approach and the opportunity to make a tangible impact. My background in ${skillsText} positions me well to support your team’s innovative efforts.`,
    
      `\n\nIn addition to my enthusiasm for the role itself, I am inspired by ${company || 'your company'}'s culture of innovation and excellence. The prospect of contributing to groundbreaking projects with a team of like-minded professionals excites me.`,
    
      `\n\nBeyond the responsibilities of this role, I am inspired by ${company || 'your company'}'s mission and values. The opportunity to contribute to an organization that prioritizes ${getCompanyStrength(company)} is incredibly motivating for me.`,
    
      `\n\nI admire how ${company || 'your company'} continues to push boundaries in ${getCompanyStrength(company)}, and I am eager to be part of that journey. I believe my skills in ${skillsText} will enable me to make valuable contributions to your team.`,
    
      `\n\nFurthermore, ${company || 'your company'}'s reputation for fostering professional growth is particularly appealing. I am excited about the opportunity to expand my expertise while contributing to the success of your organization.`,
    
      `\n\nThe company’s dedication to ${getCompanyStrength(company)} strongly resonates with me. I am confident that my experience and perspective will complement your team’s efforts in achieving continued success.`,
    
      `\n\nBeyond the role, I appreciate ${company || 'your company'}'s commitment to creating meaningful change in the industry. The possibility of working on initiatives that make a difference is something I find deeply fulfilling.`,
    
      `\n\nI admire ${company || 'your company'}'s ability to lead and innovate in ${getCompanyStrength(company)}. The chance to be part of a team that is shaping the future excites me, and I look forward to the possibility of contributing my expertise.`,
    
      `\n\nAdditionally, I am excited about the chance to work with professionals who are just as passionate about ${getCompanyStrength(company)} as I am. I believe my background in ${skillsText} aligns perfectly with the team’s vision and goals.`,
    
      `\n\nWorking at ${company || 'your company'} represents an incredible opportunity to learn, grow, and contribute to impactful projects. I am eager to bring my insights and expertise to help drive success and innovation within your team.`,
    
      `\n\nMoreover, I appreciate ${company || 'your company'}'s focus on fostering a dynamic and inclusive workplace. The prospect of contributing to a company that values both innovation and collaboration is particularly exciting for me.`
    ];
    // content += `\n\nFurthermore, I admire ${company || 'your company'}'s commitment to innovation and excellence in the industry. The prospect of collaborating with your talented team on impactful projects is particularly motivating for me. I believe that my unique approach to ${jobTitle || 'this role'} can help drive success and create new opportunities for growth.`;
    content += whyInterestedEnhancements[Math.floor(Math.random() * whyInterestedEnhancements.length)];
  }

  return content;
};

// Helper function to generate "Achievements" content
const generateAchievementsContent = (request: AIExpandRequestField): string => {
  const { currentValue, jobTitle, skills } = request;

  // Base content is what the user already provided
  let content = currentValue.trim();

  // If the content is very short or empty, generate more substantial content
  if (content.length < 50) {
    const relevantSkill = skills && skills.length > 0 ? skills[0] : getRandomSkill();
    const jobRelatedAchievement = getJobRelatedAchievement(jobTitle);

    content = `• Successfully implemented a ${relevantSkill} solution that improved efficiency by 30% and reduced costs.
• ${jobRelatedAchievement}
• Received recognition for exceptional performance and contribution to team success.
• Led a cross-functional project that delivered results ahead of schedule and under budget.`;
  }
  // If there's already some content, enhance it with bullet points if needed
  else if (!content.includes('•') && !content.includes('-')) {
    // Convert existing content to bullet points
    const sentences = content.split(/\.\s+/);
    content = sentences
      .filter(sentence => sentence.trim().length > 0)
      .map(sentence => `• ${sentence.trim()}${!sentence.trim().endsWith('.') ? '.' : ''}`)
      .join('\n');

    // Add a couple more achievements
    content += `\n• Spearheaded an initiative that resulted in ${getRandomPercentage()}% improvement in ${getRandomMetric()}.
• Recognized with the ${getRandomAward()} for outstanding contributions to ${getRandomContribution()}.`;
  }

  return content;
};

// Helper functions for generating specific content
const getCompanyStrength = (company?: string): string => {
  const strengths = [
    'innovation and forward-thinking',
    'excellence and quality',
    'industry leadership',
    'customer-focused solutions',
    'creative problem-solving',
    'sustainable practices and social responsibility'
  ];
  return strengths[Math.floor(Math.random() * strengths.length)];
};

const getRoleOpportunity = (jobTitle?: string): string => {
  const opportunities = [
    'apply my analytical skills to solve complex problems',
    'collaborate with cross-functional teams on innovative projects',
    'develop and implement strategic initiatives',
    'contribute to cutting-edge technologies and methodologies',
    'grow professionally while making meaningful contributions',
    'leverage my expertise to drive positive organizational impact'
  ];
  return opportunities[Math.floor(Math.random() * opportunities.length)];
};

const getRandomSkill = (): string => {
  const skills = [
    'data analysis',
    'project management',
    'digital marketing',
    'software development',
    'customer relationship',
    'process optimization'
  ];
  return skills[Math.floor(Math.random() * skills.length)];
};

const getJobRelatedAchievement = (jobTitle?: string): string => {
  if (!jobTitle) {
    const achievements = [
      'Increased team productivity by 25% through implementation of new workflows',
      'Delivered a key project that resulted in $100K annual savings',
      'Improved customer satisfaction scores by 15% through service enhancements',
      'Developed and launched a successful initiative that expanded market reach'
    ];
    return achievements[Math.floor(Math.random() * achievements.length)];
  }

  const jobTitleLower = jobTitle.toLowerCase();

  if (jobTitleLower.includes('develop') || jobTitleLower.includes('engineer') || jobTitleLower.includes('program')) {
    return 'Developed and deployed a critical application that streamlined operations and saved 20+ hours per week';
  } else if (jobTitleLower.includes('market') || jobTitleLower.includes('brand')) {
    return 'Created and executed a marketing campaign that increased conversion rates by 40% and expanded customer base';
  } else if (jobTitleLower.includes('manage') || jobTitleLower.includes('direct')) {
    return 'Successfully led a team of 10+ professionals, exceeding department targets by 30% year-over-year';
  } else if (jobTitleLower.includes('design')) {
    return 'Redesigned the user interface resulting in a 45% improvement in user engagement metrics';
  } else if (jobTitleLower.includes('doctor') || jobTitleLower.includes('physician') || jobTitleLower.includes('medical')) {
    return 'Diagnosed and treated over 500 patients annually, improving overall patient outcomes by 20%';
  } else if (jobTitleLower.includes('nurse')) {
    return 'Implemented a new patient care strategy that reduced hospital readmissions by 15% and improved patient satisfaction';
  } else if (jobTitleLower.includes('vet') || jobTitleLower.includes('veterinarian')) {
    return 'Provided expert veterinary care to over 1,000 animals, increasing clinic efficiency and client satisfaction';
  } else if (jobTitleLower.includes('survey') || jobTitleLower.includes('surveyor')) {
    return 'Conducted land surveys for major infrastructure projects, ensuring 99% accuracy in boundary assessments';
  } else if (jobTitleLower.includes('teacher') || jobTitleLower.includes('educator') || jobTitleLower.includes('professor')) {
    return 'Designed and delivered engaging lessons that increased student performance by 30% in standardized tests';
  } else if (jobTitleLower.includes('accountant') || jobTitleLower.includes('finance')) {
    return 'Optimized financial reporting processes, leading to a 25% reduction in errors and improved audit compliance';
  } else if (jobTitleLower.includes('lawyer') || jobTitleLower.includes('legal') || jobTitleLower.includes('attorney')) {
    return 'Successfully won 85% of litigation cases, securing favorable outcomes for clients and maintaining firm reputation';
  } else if (jobTitleLower.includes('hr') || jobTitleLower.includes('human resources') || jobTitleLower.includes('recruiter')) {
    return 'Implemented new hiring strategies, reducing time-to-hire by 30% and improving employee retention rates';
  } else if (jobTitleLower.includes('chef') || jobTitleLower.includes('cook')) {
    return 'Revamped restaurant menu, increasing sales by 25% and earning recognition in local culinary awards';
  } else if (jobTitleLower.includes('sales') || jobTitleLower.includes('business development')) {
    return 'Exceeded sales targets by 40%, driving revenue growth and expanding client base in competitive markets';
  } else if (jobTitleLower.includes('customer service') || jobTitleLower.includes('support')) {
    return 'Resolved over 95% of customer issues on first contact, boosting satisfaction ratings to 4.8/5';
  } else {
    return 'Received recognition for exceptional performance, exceeding targets by 25% and driving team success';
  }
};


const getRandomPercentage = (): string => {
  return (Math.floor(Math.random() * 35) + 15).toString();
};

const getRandomMetric = (): string => {
  const metrics = [
    'customer satisfaction',
    'operational efficiency',
    'productivity',
    'revenue growth',
    'user engagement',
    'team performance'
  ];
  return metrics[Math.floor(Math.random() * metrics.length)];
};

const getRandomAward = (): string => {
  const awards = [
    'Excellence Award',
    'Leadership Award',
    'Innovation Star',
    'Performance Recognition',
    'Achievement Medal',
    'Top Performer Certificate'
  ];
  return awards[Math.floor(Math.random() * awards.length)];
};

const getRandomContribution = (): string => {
  const contributions = [
    'the company growth strategy',
    'product development',
    'team excellence',
    'customer success',
    'process innovation',
    'service quality'
  ];
  return contributions[Math.floor(Math.random() * contributions.length)];
};

// Tips for writing better cover letters
export const coverLetterTips = [
  {
    title: "Research the company",
    description: "Show that you understand their mission, values, and recent achievements."
  },
  {
    title: "Address specific requirements",
    description: "Demonstrate how your skills match what they're looking for in the job description."
  },
  {
    title: "Show enthusiasm",
    description: "Express genuine interest in the role and the company."
  },
  {
    title: "Keep it concise",
    description: "Limit your letter to one page with focused, relevant information."
  },
  {
    title: "Quantify achievements",
    description: "Use numbers and specific results when discussing your accomplishments."
  },
  {
    title: "Use a professional tone",
    description: "Be conversational but maintain appropriate formality."
  },
  {
    title: "Proofread carefully",
    description: "Eliminate all grammar and spelling errors before submitting."
  }
];
