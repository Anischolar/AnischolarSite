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

const Opportunities = () => {

    interface MyData {
        id: string;
        jobTitle: string;
        slots: number;
        firm: string;
        createdAt: firebase.firestore.Timestamp;
        description: string;
        benefits: string[];
        link: string;
    }

    interface FirestoreData {
        jobTitle: string;
        slots: number;
        firm: string;
        createdAt: firebase.firestore.Timestamp;
        description: string;
        benefits: string[];
        link: string;
    }

    const [opportunitiesList, setOpportunitiesList] = useState<MyData[]>([]);
    const [loading, setLoading] = useState(true);
    const opportunitiesCollection = collection(db, "opprtunities");
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getOpportunities = async () => {
            try {
                const data = await getDocs(opportunitiesCollection);
                const filteredData = data.docs.map((doc) => ({
                    ...(doc.data() as FirestoreData),
                    id: doc.id,
                }));
                setOpportunitiesList(filteredData);
            } catch (err) {
                console.log("my error", err);
            } finally {
                setLoading(false);
            }
        };

        getOpportunities();
    }, []);

    console.log(opportunitiesList);

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
            <Header title="Opportunities" title2="" />
            <main id="main">
                <section className="breadcrumbs">
                    <div className="container d-flex justify-content-center pt-2">
                        <h1 className="m-0" style={{ color: "#27ae60" }}>
                            Opportunities
                        </h1>
                    </div>
                    <div className="container d-flex justify-content-center pt-1">
                        <p className="m-0">
                            Call for applicants - Job opportunities
                        </p>
                    </div>
                </section>

                <div className="container">
                    {loading ? (
                        <div id="loadingSpinner" className="text-center">
                            <div className="spinner">
                                <div className="dot1"></div>
                                <div className="dot2"></div>
                            </div>
                            <p>Loading job opportunities, please wait...</p>
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-lg-2 g-4">
                            {opportunitiesList.map((opportunity) => (
                                <div key={opportunity.id} className="col">
                                    <div className="card shadow card-borderless h-100">
                                        <div className="card-body">
                                    
                                            <h6 className="available-slots right-1">
                                                Available Slots:
                                                <span className="badge bg-primary-subtle text-primary badge-border ms-2">
                                                    {opportunity.slots}
                                                </span>
                                            </h6>
                                            <div className="mb-4">
                                                <h5 className="card-title">
                                                    <strong>Job Title: </strong> {opportunity.jobTitle}
                                                </h5>
                                                <p className="card-text">
                                                    <strong>Firm: </strong>
                                                    {opportunity?.firm}
                                                </p>
                                                <p>{opportunity.description}</p>
                                                {opportunity?.benefits && (
                                                    <div className="mt-3">
                                                        <strong>Benefits: </strong>
                                                        {opportunity.benefits.map(
                                                            (benefit, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="badge bg-success-subtle text-dark me-2"
                                                                >
                                                                    {benefit}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                <p className="card-text mb-0">
                                                    <small className="text-body-secondary">
                                                        Posted {getDuration(opportunity.createdAt)}
                                                    </small>
                                                </p>
                                                {isLoggedIn ? (
                                                    <a
                                                        href={opportunity?.link}
                                                        className="btn bg-success text-white"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View Details
                                                    </a>
                                                ) : (
                                                    <button
                                                        className="btn bg-success text-white"
                                                        onClick={handleLoginRedirect}
                                                    >
                                                        Login for Details
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Opportunities;
