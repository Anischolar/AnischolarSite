import React, { useState } from "react";
import image1 from "../assets/img/illustration-6.svg";
import anischolarVision from "../assets/img/anischolar-vision.png"
import anischolarMission from "../assets/img/anischolar-mission.png"
import anischolarValues from "../assets/img/anischolar-values.png"
import { Link } from "react-router-dom";
import { ImPlay } from "react-icons/im";
// import CountUp from "react-countup";

const YoutubeIframe = () => {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/sb7sBaQJeas"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

const AboutUs = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('vision');

  return (
    <div>
      <div className="grey-bar" />
      <section id="about" className="mt-0 mb-0">
        <section className="about">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>About Us</h2>
            </div>
            <div className="row content items-center">
              <div className="col-lg-6 lg:pr-20 p-4" data-aos="fade-up" data-aos-delay="150">
                <p className="text-4xl">
                  “AniScholar is a pioneering EdTech”
                </p>
                <p className="py-10">
                  AniScholar is a pioneering EdTech career readiness platform dedicated to
                  bridging the gap between academia and industry. We provide personalized
                  career readiness programs and connect students with valuable internship
                  opportunities, addressing the challenges they face in securing internships
                  and gaining industry experience.
                </p>
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <article className='w-full h-full flex items-center justify-center rounded-2xl
                  border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4'>

                  <div className='absolute -top-2 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
                    rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]'
                  />
                  <YoutubeIframe />
                  {/* {
                    isClicked ? (
                      <YoutubeIframe />
                    ) : (
                      <>
                        <div className='w-full flex flex-col items-start justify-between mt-4'>
                          <p className="text-4xl">
                            Launch your career with Anischolar
                          </p>
                        </div>
                        <div className="opacity-6 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setIsClicked(true)}
                          >
                            <ImPlay className="text-8xl" />
                          </button>
                        </div>
                        <Link to='/' target='_blank'
                          className='w-full cursor-pointer overflow-hidden rounded-lg'
                        >
                          <img src={image1} alt='my image' className='w-full h-auto'
                          />
                        </Link>
                      </>
                    )
                  } */}
                </article>
              </div>
            </div>

            <div className="row items-center justify-center pt-12">
              <div className="col-lg-0 items-center px-20" data-aos="fade-up" data-aos-delay="150">
                {/* {activeTab === 'vision' &&  <img className="h-1/2 w-1/2" src={anischolarVision} />}
              {activeTab === 'mission' &&  <img className="h-1/2 w-1/2" src={anischolarMission} />}
              {activeTab === 'values' &&  <img className="h-1/2 w-1/2" src={anischolarValues} />} */}
              </div>

              <div className="col-lg-8 lg:pr-20" data-aos="fade-up" data-aos-delay="150">
                <div className="flex justify-between space-x-4 mb-2 w-full">
                  <button
                    onClick={() => setActiveTab('vision')}
                    className={`px-4 py-2 rounded ${activeTab === 'vision'
                      ? 'bg-[#27ae60] text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => setActiveTab('mission')}
                    className={`px-4 py-2 rounded ${activeTab === 'mission'
                      ? 'bg-[#27ae60] text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => setActiveTab('values')}
                    className={`px-4 py-2 rounded ${activeTab === 'values'
                      ? 'bg-[#27ae60] text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    Core Values
                  </button>
                </div>

                {activeTab === 'vision' &&
                  <div className="py-10 px-4 bg-gray-50 rounded-lg shadow-md">
                    <p className="lg:py-10 p-4">
                      To be the leading providers of career readiness programs and internships to all students on their
                      professional journey.
                    </p>
                  </div>
                }
                {activeTab === 'mission' &&
                  <div className="py-10 px-4 bg-gray-50 rounded-lg shadow-md">
                    <p className="py-10">
                      To foster student-employer synergy through crafted internships that promote skill development and
                      showcase student potential in institutional workspaces.
                    </p>
                  </div>

                }
                {activeTab === 'values' && (
                  <div className="py-10 px-4 bg-gray-50 rounded-lg shadow-md">
                    <ul className="space-y-4">
                      <li className="">
                             <span className="text-[#27ae60] font-semibold">Inclusivity:</span>
                        <span className="ml-2 text-gray-700">
                          Create opportunities for all students, regardless of their background or experience.
                        </span>
                     
                      </li>
                      <li className="">
                        <span className="text-[#27ae60] font-semibold">Mentorship:</span>
                        <span className="ml-2 text-gray-700">
                          Guide students through their career journey with personalized support and expert advice.
                        </span>
                      </li>
                      <li className="">
                        <span className="text-[#27ae60] font-semibold">Accountability:</span>
                        <span className="ml-2 text-gray-700">
                          Take full responsibility for delivering on our commitments, ensuring transparency and trust in all our actions.
                        </span>
                      </li>
                      <li className="">
                        <span className="text-[#27ae60] font-semibold">Impact:</span>
                        <span className="ml-2 text-gray-700">
                          Our goal is to make a significant and long-lasting difference in the lives of our students and the companies we work with.
                        </span>
                      </li>
                    </ul>
                  </div>
                )}


              </div>
            </div>
          </div>
        </section>

      </section>
    </div>
  );
};

export default AboutUs;
