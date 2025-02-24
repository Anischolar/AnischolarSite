import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import {
  collection,
  DocumentReference,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Config/firebase.config";
import React from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../authProvider"; // Adjust the import path
import Header from "../components/Header";

const Internships = () => {
  interface Farm {
    name: string;
    location: string;
    dealIn: string[];
  }

  interface MyData {
    id: string;
    title: string;
    supervisor: string;
    slots: number;
    farm: DocumentReference<Farm>;
    image: string;
    createdAt: firebase.firestore.Timestamp;
    description: string;
  }

  interface FirestoreData {
    title: string;
    supervisor: string;
    slots: number;
    farm: DocumentReference<Farm>;
    image: string;
    createdAt: firebase.firestore.Timestamp;
    description: string;
  }

  const [internshipList, setInternshipList] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);
  const internshipCollection = collection(db, "internships");
  const [farmData, setFarmData] = useState<Record<string, Farm>>({});
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getInternships = async () => {
      try {
        const data = await getDocs(internshipCollection);
        const filteredData = data.docs.map((doc) => ({
          ...(doc.data() as FirestoreData),
          id: doc.id,
        }));

        const farms: Record<string, Farm> = {};
        for (const internship of filteredData) {
          const farmDoc = await getDoc(internship.farm);
          if (farmDoc.exists()) {
            farms[internship.farm.id] = farmDoc.data() as Farm;
          }
        }
        setFarmData(farms);
        setInternshipList(filteredData);
      } catch (err) {
        console.log("my error", err);
      } finally {
        setLoading(false);
      }
    };

    getInternships();
  }, []);

  const getDuration = (timestamp: firebase.firestore.Timestamp) => {
    const now = new Date();
    const postDate = timestamp.toDate();
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return `${Math.floor(seconds)} second${seconds > 1 ? "s" : ""} ago`;
  };

  const handleLoginRedirect = () => {
    // Store the intended path in state
    navigate("/login", { state: { from: "/applicationForm" } });
  };

  return (
    <>
     <Header title="Internships" title2="" />
      <main id="main">
        <section className="breadcrumbs">
          <div className="container d-flex justify-content-center p-5">
            <h1 className="m-0" style={{ color: "#27ae60" }}>
              Internships
            </h1>
          </div>
        </section>

        <div className="container">
          {loading ? (
            <div id="loadingSpinner" className="text-center">
              <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
              </div>
              <p>Loading internships, please wait...</p>
            </div>
          ) : (
            internshipList.map((internship) => (
              <div
                key={internship.id}
                className="d-flex flex-column justify-content-center"
              >
                <div className="row mb-5" style={{ marginTop: "70px" }}>
                  <div className="col-md-12 internship">
                    <div className="card shadow card-borderless">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={internship.image}
                            className="img-fluid rounded-start"
                            alt={internship.title}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h6 className="available-slots">
                              Available Slots:
                              <span className="badge bg-primary-subtle text-primary badge-border ms-2">
                                {internship.slots}
                              </span>
                            </h6>
                            <div className="d-flex mb-4 align-items-center">
                              <div>
                                <h5 className="card-title">
                                  {internship.title}
                                </h5>
                                <p className="text-muted mb-1">
                                  <strong>Supervisor: </strong>
                                  {internship.supervisor}
                                </p>
                                <p className="card-text">
                                  <strong>Farm: </strong>
                                  <Link
                                    className="text-decoration-none"
                                    to={`/farm/${internship.farm.id}`}
                                  >
                                    {farmData[internship.farm.id]?.name ||
                                      "Loading..."}
                                  </Link>
                                </p>
                                <p>{internship.description}</p>
                                {farmData[internship.farm.id]?.dealIn && (
                                  <div className="mt-3">
                                    <strong>Deals In: </strong>
                                    {farmData[internship.farm.id].dealIn.map(
                                      (deal, index) => (
                                        <span
                                          key={index}
                                          className="badge bg-success-subtle text-dark me-2"
                                        >
                                          {deal}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text mb-0">
                                <small className="text-body-secondary">
                                  Posted {getDuration(internship.createdAt)}
                                </small>
                              </p>
                              {isLoggedIn ? (
                                <Link
                                  // to={`/applicationForm?internshipId=${internship.id}&internshipName=${internship.title}`}
                                  to='/compare/plans'
                                  className="btn bg-success text-white"
                                >
                                  Apply Now
                                </Link>
                              ) : (
                                <button
                                  className="btn bg-success text-white"
                                  onClick={handleLoginRedirect}
                                >
                                  Login to apply
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Internships;
