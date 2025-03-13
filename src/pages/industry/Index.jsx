import React, { useEffect, useState } from "react";
import { Button } from "../../components/industryComponents/ui/button";
import { Card } from "../../components/industryComponents/ui/card";
import { Building, Users, Award, ArrowRight, PlayCircle, Briefcase, List } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HeroIndustryImg from "../../assets/img/studentIndustry.jpg";
import Header from "../../components/industryComponents/ui/IndustryHeader";
import { useAuth } from "../../authProvider";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../Config/firebase.config";

const Index = () => {
  const { user, isLoggedIn, logout, companyData, setCompanyData } = useAuth();
  const [isCompanyUser, setIsCompanyUser] = useState(true);

  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    const userId = user?.uid;
    const fetchUserData = async () => {
      try {
        const companyRef = collection(db, "companies");
        const q = query(companyRef, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          console.log("Company data:", data);

          setCompanyData({
            ...data,
            profilePicture: data?.profilePicture?.url || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
          });
        } else {
          setIsCompanyUser(false);
          navigate("/");

        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

  }, [user?.uid]);

  return (
    <div className="min-h-screen">
      <Header title="Industry Portal" companyData={companyData} />
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
                {isLoggedIn ? (
                  <>Welcome back, {companyData?.companyName || 'Partner'}!</>
                ) : (
                  <>Connect Your Industry with Top Student Talent</>
                )}
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                {isLoggedIn
                  ? "Manage your talent pipeline and access premium recruitment tools"
                  : "Join our platform to discover and engage with qualified students ready to contribute to your organization's success."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn ? (
                  <>
                    <Button size="lg" className="hover-lift bg-[#27ae60] text-white" asChild>
                      <Link to="/industry">
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="hover-lift" asChild>
                      <Link to="/industry">
                        Post Opportunity
                        <Briefcase className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="hover-lift bg-[#27ae60] text-white" asChild>
                      <Link to="/industry/create-profile">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="hover-lift" asChild>
                      <Link to="/industry">
                        Request Demo
                        <PlayCircle className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl animate-fadeIn [animation-delay:200ms]">
              <img
                // src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce" 
                src={HeroIndustryImg}
                alt="Students collaborating in East Africa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-900/0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 glass-card animate-fadeIn hover-lift">
              <Building className="h-12 w-12 mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Industry Access</h3>
              <p className="text-slate-600">
                Direct access to a diverse pool of talented students from various disciplines.
              </p>
            </Card>
            <Card className="p-6 glass-card animate-fadeIn hover-lift [animation-delay:200ms]">
              <Users className="h-12 w-12 mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Talent Pipeline</h3>
              <p className="text-slate-600">
                Build your future workforce by connecting with students early in their careers.
              </p>
            </Card>
            <Card className="p-6 glass-card animate-fadeIn hover-lift [animation-delay:400ms]">
              <Award className="h-12 w-12 mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Quality Matches</h3>
              <p className="text-slate-600">
                Our platform ensures you connect with students who match your requirements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fadeIn">
              <div className="text-4xl font-bold mb-2 text-gradient">20+</div>
              <p className="text-slate-600">Partner Companies</p>
            </div>
            <div className="animate-fadeIn [animation-delay:200ms]">
              <div className="text-4xl font-bold mb-2 text-gradient">10,000+</div>
              <p className="text-slate-600">Student Connections</p>
            </div>
            <div className="animate-fadeIn [animation-delay:400ms]">
              <div className="text-4xl font-bold mb-2 text-gradient">95%</div>
              <p className="text-slate-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Dashboard Links Section */}
      {
        isLoggedIn && (


          <section className="py-16 bg-slate-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">Company Dashboard</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-6 glass-card hover-lift transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Briefcase className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Post Opportunities</h3>
                    <p className="text-slate-600 mb-6">
                      Create job and internship postings for students to discover and apply
                    </p>
                    <Button className="bg-[#27ae60] text-white" asChild>
                      <Link to="/industry">
                        Post a Job
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 glass-card hover-lift transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <List className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">View Applications</h3>
                    <p className="text-slate-600 mb-6">
                      Manage and review student applications for your posted opportunities
                    </p>
                    <Button className="bg-[#27ae60] text-white" asChild>
                      <Link to="/industry">
                        View Applications
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )
      }

      {/* CTA Section - Different for logged in users */}
      <section className="py-20 bg-[#27ae60] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isLoggedIn
              ? "Need Help With Your Recruitment?"
              : "Ready to Transform Your Recruitment?"}
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            {isLoggedIn
              ? "Explore our premium plans or schedule a consultation with our talent experts"
              : "Join leading companies that are already discovering and connecting with exceptional student talent."}
          </p>
          <div className="flex justify-center gap-4">
            {isLoggedIn ? (
              <>
                <Button size="lg" className="hover-lift bg-[#f5ab0b] hover:bg-[#f1c25b]" asChild>
                  <Link to="/industry">
                    View Premium Plans
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white" asChild>
                  <Link to="/industry">
                    Contact Support
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <Button size="lg" className="hover-lift bg-[#f5ab0b] hover:bg-[#f1c25b]" asChild>
                <Link to="/industry/create-profile">
                  Create Company Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
