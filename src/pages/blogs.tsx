/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, getDocs, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Config/firebase.config";
import logo from "../assets/img/logo1.png";
import React from "react";
import Header from "../components/Header";


const blogs = () => {
  interface MyData {
    id: string;
    title: string;
    author: string;
    authorTitle: string;
    image: string;
    description: string;
    date: Date;
  }

  const [blogList, setBlogList] = useState<MyData[]>([]);
  const blogsCollection = collection(db, "blogs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getDocs(blogsCollection);

        // Map Firestore data to MyData
        const filteredData: MyData[] = data.docs.map((doc) => {
          const docData = doc.data();

          // Convert Firestore Timestamp to Date
          const date = docData.date instanceof Timestamp ? docData.date.toDate() : new Date(docData.date);

          return {
            id: doc.id,
            title: docData.title || '',
            author: docData.author || '',
            authorTitle: docData.authorTitle || '',
            image: docData.image || '',
            description: docData.description || '',
            date,
          };
        });

        setBlogList(filteredData);
      } catch (err) {
        console.log("my error", err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  return (
    <div>
      <Header title="Blogs" title2="" />

      <main id="main">
        <section className="breadcrumbs">
          <div className="container d-flex justify-content-center p-5">
            <h1 className="m-0" style={{ color: "#27ae60" }}>
              Blogs
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
              <p>Loading articles, please wait...</p>
            </div>
          ) : (
            <div className="row">
              {blogList.map((blog) => (
                <section id="blog" className="blog col-md-6 rounded">
                  <article className="entry" key={blog.id} data-aos="fade-up">
                    <div className="entry-img">
                      <img src={blog.image} className="img-fluid" />
                    </div>
                    <h2 className="entry-title">
                      <Link to={`/blogDetail/${blog.id}`}>{blog.title}</Link>
                    </h2>
                    <div className="entry-meta">
                      <ul>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-person"></i>{" "}
                          <a href="#">{blog.author}</a>
                        </li>
                        <li className="d-flex align-items-center">
                          <i className="bi bi-clock"></i>{" "}
                          <a href="#">
                            <time dateTime="{blog.date}">
                              {new Date(blog.date).toDateString()}
                            </time>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="entry-content">
                      <p>{blog.description}</p>
                    </div>
                    <div className="read-more">
                      <Link to={`/blogDetail/${blog.id}`}>Read More</Link>
                    </div>
                  </article>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default blogs;
