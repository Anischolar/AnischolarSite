import React from "react";

const Faq = () => {
  return (
    <div>
      <section id="faq">
        <section className="faq">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Frequently Asked Questions</h2>
            </div>

            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="col-lg-5">
                <i className="ri-question-line"></i>
                <h4>How can I apply for an internship on your website?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  To apply for an internship, simply navigate to the "Internship
                  Opportunities" section on our website. There, you'll find
                  detailed information about available positions and application
                  instructions. Follow the specified guidelines to submit your
                  application.
                </p>
              </div>
            </div>

            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="col-lg-5">
                <i className="ri-question-line"></i>
                <h4>
                  Are the projects listed suitable for veterinary students at
                  all levels of study?
                </h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Yes, our projects cater to students at various levels of
                  study. Whether you're an undergraduate or pursuing advanced
                  studies, you'll find a range of projects that align with
                  different skill sets and knowledge levels in the field of
                  veterinary sciences.
                </p>
              </div>
            </div>

            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="col-lg-5">
                <i className="ri-question-line"></i>
                <h4>
                  What is the duration of your short courses, and how do I
                  enroll?
                </h4>
              </div>
              <div className="col-lg-7">
                <p>
                  The duration of our short courses varies, and you can find
                  specific details on the course pages. To enroll, visit the
                  "Short Courses" section, select the course you're interested
                  in, and follow the enrollment instructions. Our courses are
                  designed to be flexible and accessible for veterinary
                  students.
                </p>
              </div>
            </div>

            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="col-lg-5">
                <i className="ri-question-line"></i>
                <h4>
                  Are the internships paid, and do you provide accommodation
                  support?
                </h4>
              </div>
              <div className="col-lg-7">
                <p>
                  While some internships may offer stipends or compensation, the
                  specifics vary depending on the opportunity. Details regarding
                  compensation and accommodation support, if available, are
                  provided in the internship descriptions. We encourage you to
                  review each internship listing for comprehensive information.
                </p>
              </div>
            </div>

            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="col-lg-5">
                <i className="ri-question-line"></i>
                <h4>
                  How can I track the progress of my internship or project
                  application?
                </h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Once you've submitted your application for an internship or
                  project, you'll receive an acknowledgment email. The selection
                  process timeline and any updates will be communicated through
                  the email address you provided during the application.
                  Additionally, you can log in to your account on our website to
                  check the status of your application and receive further
                  instructions if selected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Faq
