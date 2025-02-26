import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import React from "react";
import internshipImage from "../assets/img/internship-icon.png";
import communityImage from "../assets/img/community-icon.png";
import eventsImage from "../assets/img/events.png";
import shortCourseImage from "../assets/img/short-course.png";

const Services = () => {
  return (
    <div>
      <div className="grey-bar" />
      <section id="services">
        <section className="services">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Services</h2>
              <p>Tailored for your Excellence!</p>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-5">
                <Link
                  to="/internships"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ServiceCard
                    icon={internshipImage}
                    name={"Internship"}
                    desription={"Gain hands-on experience, mentorship."}
                  />
                </Link>
              </div>
              <div
                className="col-lg-6 mb-5"
              >
                <Link
                  to="/short-courses"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ServiceCard
                    icon={shortCourseImage}
                    name={"Short Courses"}
                    desription={"Catch up on the latest trends and skills."}
                  />
                </Link>

                {/* <span className="badge services text-bg-success">
                  Coming Soon
                </span> */}
              </div>
              <div
                className="col-lg-6 align-items-stretch mb-5"
                style={{ position: "relative" }}
              >
                <Link
                  to='/opportunities'
                >
                  <ServiceCard
                    icon={communityImage}
                    name={"Opportunities"}
                    desription={
                      "Work on real-world projects with industry experts."
                    }
                  />
                </Link>
                {/* <span className="badge services text-bg-success">
                  Coming Soon
                </span> */}
              </div>
              <div
                className="col-lg-6 align-items-stretch mb-5"
                style={{ position: "relative" }}
              >
                <ServiceCard
                  icon={eventsImage}
                  name={"Career Events"}
                  desription={
                    "Attend events and network with industry leaders."
                  }
                />
                {/* <span className="badge services text-bg-success">
                  Coming Soon
                </span> */}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Services;
