import { Link } from "react-router-dom";
import heroImage from "../assets/img/hero1.png";
import React, { useState } from "react";
import { useAuth } from "../authProvider";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./industryComponents/ui/dialog";

const Hero = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="hero">
      <section id="hero">
        <section className="d-flex align-items-center">
          <div className="container">
            <div className="row items-center">
              <div className="col-md-5 pt-4 pt-lg-0 order-2 order-md-1 d-flex flex-column justify-content-center hero-left">
                <h1 className="xl:text-7xl lg:text-6xl text-4xl flex flex-col" data-aos="fade-up">
                  Launch &nbsp;
                  <span className="lg:pt-4">Your Career</span>
                </h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  Start with your CV
                </h2>
                <div className="get-started" data-aos="fade-up" data-aos-delay="100">
                  {isLoggedIn ? (
                    <div className="flex">
                    <Link to="/resumes" className="btn-get-started scrollto">
                      CREATE CV
                    </Link>

                  <Link to="/cover-letter" className="font-bold ml-4 text-[16px] tracking-wide inline-block px-7 py-2.5 rounded-full transition duration-500 border-2 border-[#27ae60;] bg-white hover:text-[#27ae60]">
                      COVER LETTER
                    </Link>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="btn-get-started scrollto">Get Started</button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md mx-auto">
                        <DialogHeader>
                          <DialogTitle className="text-white">Select Registration Type</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Link
                            to="/register"
                            className="block w-full px-4 py-2 text-left bg-blue-100 hover:bg-blue-200 text-[#fb923c] rounded-md transition-colors"
                          >
                            Register as Student
                          </Link>
                          <Link
                            to="/industry/create-profile"
                            className="block w-full px-4 py-2 text-left bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors"
                          >
                            Register as Company
                          </Link>
                        </div>
                        <DialogClose asChild>
                          <button className="mt-6 text-gray-100 hover:text-gray-300">Cancel</button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <span className="background-blur"></span>
              </div>
              <div className="col-md-7 order-1 order-md-2 hero-img" data-aos="fade-left" data-aos-delay="200">
                <img src={heroImage} className="img-fluid animated" alt="Hero" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Hero;
