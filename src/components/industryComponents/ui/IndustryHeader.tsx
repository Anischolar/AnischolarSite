import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Building, User, LogOut } from "lucide-react";
import logo from "../../../assets/img/logo2.png";
import { useAuth } from "../../../authProvider";


interface HeaderProps {
  title: string;
  companyData?: {
    companyName: string;
    contact: {
      phone: string;
      name: string;
      email: string;
      title: string;
    };
    createdAt: any;
    description: string;
    industry: string;
    location: string;
    size: string;
    uid: string;
    website: string;
  };
}

const Header = ({ title, companyData }: HeaderProps) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/industry/signin");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section - Logo and Main Nav */}
        <div className="flex items-center gap-8">
          <Link to="/industry" className="flex items-center gap-2">
            <img src={logo} alt="" className="img-fluid h-12 w-36" />
          </Link>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Talent Pool
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Compare Plans
                </Link>
              </Button>
            </div>
          ) :
          (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Services
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Talent Pool
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/industry" className="text-slate-600 hover:text-[#27ae60]">
                  Compare Plans
                </Link>
              </Button>
            </div>
          )
          }
        </div>

        {/* Right Section - User Controls */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-slate-600">
                  {companyData?.companyName || "Company Profile"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/industry/signin" className="text-slate-600 hover:text-[#27ae60]">
                  Sign In
                </Link>
              </Button>
              <Button asChild className="bg-[#27ae60] text-white hover:bg-[#5db381]">
                <Link to="/industry/create-profile">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isLoggedIn && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex items-center justify-around">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/industry">
                <span className="text-slate-600">Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/industry">
                <span className="text-slate-600">Talent</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/industry">
                <span className="text-slate-600">Plans</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;