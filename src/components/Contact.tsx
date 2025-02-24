/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import emailjs from "emailjs-com";
import logo from "../assets/img/logo2.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await emailjs.send(
        "service_9woakfw",
        "template_msw9di6",
        formData,
        "N6kF27B0JBmJHfAVf"
      );

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message sent",
          showConfirmButton: false,
          timer: 1000,
        });
        setFormData({
          name: "",
          subject: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section id="contact" className="contact section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Contact Us</h2>
          </div>

          <div className="row">
            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="contact-about">
                <div className="logo">
                  <a>
                    <img src={logo} alt="" className="img-fluid w-40 h-12"></img>
                  </a>
                </div>
                <div className="social-links">
                  <a href="#" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 mt-4 mt-md-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="font-bold pb-3">Help</h1>
              <div className="info">
                <div>
                  FAQs
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 mt-4 mt-md-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="font-bold pb-3">Contacts</h1>
              <div className="info">
                <div>
                  <i className="ri-mail-send-line"></i>
                  <p>info@anischolar.com</p>
                </div>

                <div>
                  <i className="ri-phone-line"></i>
                  <p>
                    +256-750-621-209
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-12"
              data-aos="fade-up"
              data-aos-delay="300"
            >

              <h1 className="font-bold pb-3">Explore</h1>
              <div className="info">
                <div>
                  Blog
                </div>
              </div>
              {/* <form onSubmit={handleSubmit} className="">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <br />
                <div className="form-group">
                  <input
                    className="form-control"
                    name="message"
                    id="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="text-center mt-3">
                  <button
                    type="submit"
                    className="fw-blod text-white btn bg-success"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending message..." : "Send Message"}
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
