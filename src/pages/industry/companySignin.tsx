import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "../../components/industryComponents/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/industryComponents/ui/card";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../Config/firebase.config";
import { useAuth } from "../../authProvider";
import Header from "../../components/industryComponents/ui/IndustryHeader";

const CompanySignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
     const {user} =  await signInWithEmailAndPassword(auth, email, password);
      login(user);
      navigate("/industry"); // Redirect to dashboard after successful login
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Company Sign In" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Welcome Back
            </h1>
            <p className="text-lg text-slate-600">
              Sign in to manage your company profile and opportunities
            </p>
          </div>

          <Card className="animate-fadeIn [animation-delay:200ms] shadow-lg">
            <CardHeader>
              <CardTitle>Company Sign In</CardTitle>
              <CardDescription>
                Use your company credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Company Email*
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="contact@company.com"
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full hover-lift bg-[#27ae60] hover:bg-[#5db381] text-white"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-600 mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/industry/create-profile"
                    className="text-[#27ae60] hover:underline"
                  >
                    Create Company Profile
                  </Link>
                </div>

                <div className="text-center text-sm text-slate-600">
                  <Link
                    to="/forgot-password"
                    className="text-[#27ae60] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanySignIn;