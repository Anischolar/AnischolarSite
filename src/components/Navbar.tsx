import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import { useEffect, useState } from "react";
import React from "react";
import { useAuth } from "../authProvider";
import NavDropdown from "./NavDropdown";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../Config/firebase.config";
import { CgProfile } from "react-icons/cg";
import PhoneNavDropdown from "./PhoneNavDropdown";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [userData, setUserData] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isVisible, setIsVisible] = useState(true);

  const navigate = useNavigate();
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    setIsClicked(!isClicked);
  }

  useEffect(() => {
    const userId = user?.uid;
    const fetchUserData = async () => {
      try {
        const userDataRef = collection(db, "userData");
        const q = query(userDataRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as {
            profilePicture?: { url: string };
            firstName?: string;
            lastName?: string;
            email?: string;
          };

          setUserData({
            ...data,
            profilePicture: data?.profilePicture?.url || "",
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
          });
        } else {
          setIsStudent(false);
          navigate("/industry");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [user?.uid]);


  useEffect(() => {
    const navbar = document.querySelector("#navbar") as HTMLElement;
    const toggleButton = document.querySelector(
      ".mobile-nav-toggle"
    ) as HTMLElement;

    const mobileNavToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches(".mobile-nav-toggle")) {
        if (navbar) {
          navbar.classList.toggle("navbar-mobile");
        }
        target.classList.toggle("bi-list");
        target.classList.toggle("bi-x");
      } else {
        const isClickInsideNavbar = navbar.contains(target);
        const isClickOnToggleButton = toggleButton.contains(target);

        if (
          !isClickInsideNavbar &&
          !isClickOnToggleButton &&
          navbar.classList.contains("navbar-mobile")
        ) {
          navbar.classList.remove("navbar-mobile");
          toggleButton.classList.remove("bi-x");
          toggleButton.classList.add("bi-list");
        }
      }
    };

    document.addEventListener("click", mobileNavToggle);

    return () => {
      document.removeEventListener("click", mobileNavToggle);
    };
  }, []);


  const handleScroll = () => {
    const header = document.querySelector("#header") as HTMLElement | null;
    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarlinksActive = () => {
    const navbarLinks = document.querySelectorAll(
      "#navbar .scrollto"
    ) as NodeListOf<HTMLElement>;

    navbarLinks.forEach((navbarLink) => {
      const sectionId = navbarLink.getAttribute("href");

      if (sectionId) {
        const section = document.querySelector(sectionId) as HTMLElement | null;
        if (section) {
          const position = window.scrollY + 200;

          if (
            position >= section.offsetTop &&
            position <= section.offsetTop + section.offsetHeight
          ) {
            navbarLink.classList.add("active");
          } else {
            navbarLink.classList.remove("active");
          }
        }
      }
    });
  };

  const scrollto = (el: string) => {
    const element = document.querySelector(el) as HTMLElement | null;

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  window.addEventListener("load", navbarlinksActive);
  window.addEventListener("scroll", navbarlinksActive);

  return (
    <div>
      <header id="header" className="fixed-top flex flex-col align-items-center">
        {/* Switcher */}
        <div
          id="switcher"
          className={`flex items-center justify-center w-full h-7 bg-gray-100 text-gray-800 shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <Link
            to="/industry"
            className="text-sm font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
          >
            Hiring? <span className="hover:underline">Find your future talent here </span>
          </Link>
        </div>
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <button>
              <img src={logo} alt="" className="img-fluid"></img>
            </button>
          </div>
          <nav id="navbar" className="mobile-view navbar">
            <ul>
              <li>
                <button className="nav-link scrollto" onClick={() => scrollto("#hero")}>
                  Home
                </button>
              </li>
              <li>
                <button className="nav-link scrollto" onClick={() => scrollto("#about")}>
                  About
                </button>
              </li>
              <li>
                <button className="nav-link scrollto" onClick={() => scrollto("#services")}>
                  Services
                </button>
              </li>
              <li>
                <button className="nav-link scrollto " onClick={() => scrollto("#testimonials")}>
                  Testimonials
                </button>
              </li>
              <li>
                <button className="nav-link scrollto" onClick={() => scrollto("#clients")}>
                  Partners
                </button>
              </li>
              <li className="pl-3">
                <Link className="text-decoration-none nav-link" to="/blogs">
                  Blog
                </Link>
              </li>
              <li>
                <button className="nav-link scrollto" onClick={() => scrollto("#contact")}>
                  Contact
                </button>
              </li>
              {isLoggedIn ? (
                <li className="flex">
                  {/* <button
                    className="btn text-decoration-none getstarted"
                    onClick={logout}
                  >
                    Logout
                  </button> */}
                  <button
                    onClick={handleProfileClick}
                    className="ml-5 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-slate-100 ring-slate-100 transition hover:shadow-md hover:ring-2">
                    {userData?.profilePicture ? <img className="w-full object-cover" src={userData?.profilePicture} alt="Profile" /> :
                      <CgProfile className="w-full h-10 text-black" />}

                  </button>

                  <div className="block sm:hidden">
                    <PhoneNavDropdown />
                  </div>

                  {isClicked && <NavDropdown userData={userData} />}
                </li>
              ) : (
                <li>
                  <Link to="/login" className="text-decoration-none getstarted">
                    Login
                  </Link>
                </li>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
        <div>
          <div className="yellow-bar" />
          <div className="blue-bar" />
        </div>


      </header>


    </div>
  );
};

export default Navbar;
