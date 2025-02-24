import { Link } from "react-router-dom";
import heroImage from "../assets/img/hero1.png";
import React from "react";
import { useAuth } from "../authProvider";
import bgImage from "../assets/img/55.png"


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
                {/* <div className="gradient-lines">
                  <div className="line green-blur"></div>
                  <div className="line green"></div>
                  <div className="line orange-blur half"></div>
                  <div className="line orange half"></div>
                  <div className="mask"></div>
                </div> */}
                <h2 data-aos="fade-up" data-aos-delay="400">
                  {/* AniScholar is a career readiness platform bridging the gap between the industry and the
                  educational institutes of learning. */}
                  Start with your CV
                </h2>
                <div className="get-started" data-aos="fade-up" data-aos-delay="100">
                  {isLoggedIn ?
                    <Link to="/resumes" className="btn-get-started scrollto">CREATE CV</Link> :
                    <Link to="/register" className="btn-get-started scrollto">Get Started</Link>
                  }
                </div>
                <span className="background-blur"></span>
              </div>
              <div
                className="col-md-7 order-1 order-md-2 hero-img"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <img src={heroImage} className="img-fluid animated" alt="" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Hero
