import React, { useEffect, useState } from 'react';
import JobDetailsForm from './components/JobDetailsForm';
import CoverLetterResult from './components/CoverLetterResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/industryComponents/ui/tabs';
import { Button } from '../../components/industryComponents/ui/button';
import { ArrowDown, FileText, Heart, LightbulbIcon, Sparkles } from 'lucide-react';
import { coverLetterTips } from '../../lib/coverLetterGenerator';
import AnimatedTransition from './components/AnimatedTransition';
import { useIsMobile } from '../../hooks/use-mobile';
import Header from '../../components/Header';
import { useAuth } from '../../authProvider';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../../Config/firebase.config';

const CoverLetterIndex = () => {
  const [letterContent, setLetterContent] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { userInfo, user, setUserInfo } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const userId = user?.uid;
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDataRef = collection(db, "userData");
          const q = query(userDataRef, where("userId", "==", userId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();

            if (!userInfo?.firstName) {
              setUserInfo(data);
            }

            if (data.coverLetter) {
              setLetterContent(data.coverLetter);
            }
          } else {
            console.log("No user data found for the specified userId.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

    };

    if (userId) {
      fetchUserData();
    } else {
      fetchUserData();
    }
  }, [user?.uid]);


  const handleLetterGenerated = (content) => {
    setLetterContent(content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setLetterContent(null);
  };

  const handleScroll = () => {
    const scrollSection = document.getElementById('create-section');
    if (scrollSection) {
      scrollSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header title="User Data" title2="" />

      {!letterContent ? (
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-16 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background z-0"></div>
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <AnimatedTransition show={true} animation="blur" className="inline-block">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#27ae60]/10 text-[#27ae60] rounded-full mb-4">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Powered Cover Letters
                  </span>
                </AnimatedTransition>

                <AnimatedTransition show={true} animation="blur" delay={100}>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
                    Create a Unique Cover Letter in Seconds
                  </h1>
                </AnimatedTransition>

                <AnimatedTransition show={true} animation="blur" delay={200}>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Using your profile information, our AI crafts personalized cover letters tailored for each job you apply to.
                  </p>
                </AnimatedTransition>

                <AnimatedTransition show={true} animation="scale" delay={400} className="mt-8">
                  <Button onClick={handleScroll} size="lg" className="animate-pulse text-white bg-[#27ae60]">
                    Create Your Cover Letter
                  </Button>
                </AnimatedTransition>
              </div>

              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: <Sparkles className="h-5 w-5 text-[#27ae60]" />,
                    title: "Personalized AI",
                    description: "Our AI creates unique, tailored letters using your profile and job details."
                  },
                  {
                    icon: <FileText className="h-5 text-[#27ae60]" />,
                    title: "Unique Content",
                    description: "Every letter is distinct, ensuring your application stands out from the crowd."
                  },
                  {
                    icon: <Heart className="h-5 w-5 text-[#27ae60]" />,
                    title: "Quick & Simple",
                    description: "Just enter the job details and we'll handle the rest, saving you time and effort."
                  }
                ].map((feature, index) => (
                  <AnimatedTransition
                    key={index}
                    show={true}
                    animation="scale"
                    delay={500 + (index * 100)}
                    className="flex flex-col items-center text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#27ae60]/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </AnimatedTransition>
                ))}
              </div>

              {showScrollIndicator && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          </section>

          {/* Create Letter Section */}
          <section id="create-section" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Create Your Cover Letter</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Just tell us about the job you're applying for, and we'll generate a unique, professional cover letter using your profile information.
                </p>
              </div>

              <JobDetailsForm onLetterGenerated={handleLetterGenerated} />
            </div>
          </section>

          {/* Tips Section */}
          <section id="tips" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#27ae60]/10 text-[#27ae60]rounded-full mb-4">
                  <LightbulbIcon className="h-3 w-3 mr-1" />
                  Expert Advice
                </span>
                <h2 className="text-3xl font-bold mb-4">Tips for a Great Cover Letter</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Follow these professional tips to make your cover letter even more effective.
                </p>
              </div>

              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
                  <TabsTrigger value="structure">Structure & Format</TabsTrigger>
                  <TabsTrigger value="content">Content Tips</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                </TabsList>

                <TabsContent value="structure" className="p-6 bg-card rounded-lg shadow-sm border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Perfect Structure</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#27ae60] mt-1">•</span>
                          <span>Include a professional header with your contact information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#27ae60] mt-1">•</span>
                          <span>Address the hiring manager by name if possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#27ae60] mt-1">•</span>
                          <span>Keep your letter to one page maximum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#27ae60] mt-1">•</span>
                          <span>Use a clean, professional font and formatting</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Effective Format</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#27ae60]/10 text-[#27ae60] flex items-center justify-center text-sm font-medium">1</span>
                          <div>
                            <p className="font-medium">Opening Paragraph</p>
                            <p className="text-sm text-muted-foreground">State the position you're applying for and how you found it.</p>
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#27ae60]/10 text-[#27ae60] flex items-center justify-center text-sm font-medium">2</span>
                          <div>
                            <p className="font-medium">Body Paragraphs</p>
                            <p className="text-sm text-muted-foreground">Highlight relevant skills and experiences that match the job description.</p>
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#27ae60]/10 text-[#27ae60] flex items-center justify-center text-sm font-medium">3</span>
                          <div>
                            <p className="font-medium">Closing Paragraph</p>
                            <p className="text-sm text-muted-foreground">Thank the reader and express interest in an interview.</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="p-6 bg-card rounded-lg shadow-sm border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What to Include</h3>
                      <ul className="space-y-2">
                        {coverLetterTips.slice(0, 4).map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#27ae60] mt-1">•</span>
                            <div>
                              <span className="font-medium">{tip.title}:</span> {tip.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
                      <ul className="space-y-2">
                        {coverLetterTips.slice(4).map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#27ae60] mt-1">•</span>
                            <div>
                              <span className="font-medium">{tip.title}:</span> {tip.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mistakes" className="p-6 bg-card rounded-lg shadow-sm border">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-3">Common Mistakes to Avoid</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Using a generic template without personalization",
                        "Including irrelevant information or experience",
                        "Focusing on what you want rather than what you can offer",
                        "Making spelling or grammar errors",
                        "Being too formal or stiff in your writing style",
                        "Repeating your resume word-for-word",
                        "Forgetting to customize for each application",
                        "Making it too long or rambling"
                      ].map((mistake, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-700/10 text-red-700 flex items-center justify-center text-xs font-medium mt-0.5">
                            ✕
                          </div>
                          <p>{mistake}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

        </>
      ) : (
        <section className="pt-32 pb-20 px-6">
          <CoverLetterResult
            content={letterContent}
            onReset={handleReset}
          />
        </section>
      )}

    </div>
  );
};

export default CoverLetterIndex;
