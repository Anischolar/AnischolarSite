import AboutUs from "../components/AboutUs.js";
import BackToTop from "../components/BackToTop.js";
import Clients from "../components/Clients.js";
import Contact from "../components/Contact.js";
import Faq from "../components/Faq.js";
import Footer from "../components/Footer.js";
import Gallery from "../components/Gallery.js";
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Services from "../components/Services.js";
import Team from "../components/Team.js";
import Testimonials from "../components/Testimonials.js";
import '../App.css';
import '../main.js'
import "aos/dist/aos.css";
import React from "react";



const homePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <Testimonials />
      {/* <Gallery />
      <Team />
      <Faq /> */}
      <Clients />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default homePage
