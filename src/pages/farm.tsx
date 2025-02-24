/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../Config/firebase.config";
import internships from "./internships";
import Header from "../components/Header";

interface Farm {
  id: string;
  image: string;
  name: string;
  description: string;
  email: string;
  contact: number;
  location: string;
}
const farm = () => {
  
  const { id } = useParams<{ id: string }>(); // Get the farm ID from the URL
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        if (id) {
          const farmRef = doc(db, "farms", id);
          const farmSnap = await getDoc(farmRef);

          if (farmSnap.exists()) {
            const farmData = farmSnap.data() as Omit<Farm, "id">;
            setFarm({ id: farmSnap.id, ...farmData });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching farm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [id]);

  const handleClick = () => {
    if (farm) {
      const mailtoLink = `mailto:${farm.email}?subject=Interested in your farm&body=Hello, I am interested in learning more about your farm.`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <div>
      <Header title="Farm" title2="" />

      <div className=" page-title dark-background" data-aos="fade">
        <div className="container position-relative">
          <h1 className="mt-4">About</h1>
          <p>
            Get to know more about your potential employer
          </p>
          <nav className="breadcrumbs-2">
            <ol>
              <li>
                <a>
                  <Link to="/internships">Internships</Link>
                </a>
              </li>
              <i className="bi bi-chevron-right"></i>
              <li className="current">About Farm</li>
            </ol>
          </nav>
        </div>
      </div>
      {loading ? (
        <div id="loadingSpinner" className="text-center">
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
          <p>Loading farm details, please wait...</p>
        </div>
      ) : (
        <section id="about-3" className="mt-5 about-3 section">
          <div className="container">
            <div className="row gy-4 justify-content-between align-items-center">
              <div
                className="col-lg-6 order-lg-2 position-relative"
                data-aos="zoom-out"
              >
                <img src={farm?.image} alt="Image" className="img-fluid" />
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox pulsating-play-btn"
                >
                  <span className="play">
                    <i className="bi bi-play-fill"></i>
                  </span>
                </a>
              </div>
              <div
                className="col-lg-5 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="content-title mb-4">{farm?.name}</h2>
                <p className="mb-4">
                  {farm?.description}
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex gap-4"><i className="bi bi-envelope"></i> {farm?.email}</li>
                  <li className="d-flex gap-4"><i className="bi bi-phone"></i> {farm?.contact}</li>
                  <li className="d-flex gap-4"><i className="bi bi-geo-alt-fill"></i> {farm?.location}</li>
                </ul>

                <p>
                  <button className="btn-cta" onClick={handleClick}>
                    Get in touch
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default farm;
