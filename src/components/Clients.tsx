// Clients.js
import React, { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase.config"; // Adjust the import path as necessary
import ysauImage from "../assets/img/ysau.png";
import bringoImage from "../assets/img/bringo.png";
import olivietImage from "../assets/img/olivet.png";
import hiveImage from "../assets/img/hive-colab.png";
import ticketyoImage from "../assets/img/Ticketyo red.png";

const PartnerImage = ({image}) => {
  return (
    <img
      src={image}
      className="img-fluid h-36 w-44 mr-10"
      data-aos-delay={200}
    />
  )
}
const Clients = () => {
  const [clients, setClients] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, "partners"));
      const clientsData = querySnapshot.docs.map((doc) => doc.data());
      setClients(clientsData);
    };

    fetchClients();
  }, []);

  return (
    <div>
      <section id="clients" className="clients clients">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Our Partners</h2>
            {/* <p>We are proud to work with some of the best in the industry.</p> */}
          </div>
          <div className="">
              <div className="flex items-center justify-center partners-img">
               <PartnerImage image={hiveImage} />
               <PartnerImage image={ysauImage} />
               <PartnerImage image={bringoImage} />
               <PartnerImage image={ticketyoImage} />
               <PartnerImage image={olivietImage} />
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
