import React from "react";
import { useEffect } from "react";

const BackToTop = () => {
  const useBackToTop = () => {
    useEffect(() => {
      const backToTop = document.querySelector(
        ".back-to-top"
      ) as HTMLButtonElement | null;

      const toggleBackToTop = () => {
        if (backToTop) {
          if (window.scrollY > 100) {
            backToTop.classList.add("active");
          } else {
            backToTop.classList.remove("active");
          }
        }
      };

      window.addEventListener("scroll", toggleBackToTop);
      return () => window.removeEventListener("scroll", toggleBackToTop);
    }, []);
  };

  useBackToTop();
  
  return (
    <div>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}

export default BackToTop
