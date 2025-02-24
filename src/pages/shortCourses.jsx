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

const ShortCourses = () => {


    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();


    const handleLoginRedirect = () => {
        // Store the intended path in state
        navigate("/login", { state: { from: "/applicationForm" } });
    };

    return (
        <>
            <Header title="Short-Courses" title2="" />
            <main id="main">
                <section className="breadcrumbs">
                    <div className="container d-flex justify-content-center pt-2">
                        <h1 className="m-0" style={{ color: "#27ae60" }}>
                            Short Courses
                        </h1>
                    </div>
                    <div className="container d-flex justify-content-center pt-1">
                        <p className="m-0">
                            Call for applicants for the following short courses
                        </p>
                    </div>
                </section>

                <div className="container">
                    <h2 className="mt-5">Our Course Listings</h2>
                    <div class="max-w-sm rounded-lg bg-white shadow-sm border border-transparent">
  <div class="w-full h-36 bg-purple-200 object-cover"></div>
  <div class="p-4">
    <a href="#">
      <span class="text-gray-900 text-lg font-semibold leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
    </a>

    <p class="mt-2 text-gray-500 text-sm leading-5">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
      dolores, possimus pariatur animi temporibus nesciunt praesentium.
    </p>

    <a href="#" class="inline-flex items-center gap-1 mt-4 text-white text-sm font-medium bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition">
      Find out more
      <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  </div>
</div>

                </div>
            </main>
        </>
    );
};

export default ShortCourses;
