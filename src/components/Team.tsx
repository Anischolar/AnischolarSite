import React, { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase.config";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "team"));
      const membersData = querySnapshot.docs.map((doc) => doc.data());
      setTeamMembers(membersData);
    };

    fetchTeamMembers();
  }, []);

  return (
    <div>
      <section id="team">
        <section className="team section-bg">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Team</h2>
              <p>
                United by a passion for fostering opportunities and growth in
                the veterinary community.
              </p>
            </div>
            <div className="row">
              {teamMembers.slice().reverse().map((member, index) => (
                <div className="col-md-4" key={index}>
                  <div
                    className="member"
                    data-aos="fade-up"
                    data-aos-delay={`${(index + 1) * 100}`}
                  >
                    <div className="member-img">
                      <img
                        src={member.image}
                        className="img-fluid"
                        alt={member.name}
                      />
                      <div className="social">
                        {member.social1 && (
                          <a href={member.social1}>
                            <i className="bi bi-twitter"></i>
                          </a>
                        )}
                        {member.social2 && (
                          <a href={member.social2}>
                            <i className="bi bi-facebook"></i>
                          </a>
                        )}
                        {member.social3 && (
                          <a href={member.social3}>
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <span>{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Team;
