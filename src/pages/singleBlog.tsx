import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo1.png";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, Timestamp } from "@firebase/firestore";
import { db } from "../Config/firebase.config";

interface Blog {
  id: string;
  title: string;
  author: string;
  authorTitle: string;
  image: string;
  description: string;
  date: Timestamp;
  content: string;
  teaser: string;
  fun_fact: string;
  subtitle: string;
}

const SingleBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const blogDoc = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogDoc);
        if (blogSnapshot.exists()) {
          setBlog(blogSnapshot.data() as Blog);
          setLoading(false);
        } else {
          console.error("Blog not found");
        }
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (date: Timestamp) => {
    const dateObj = date.toDate();
    return dateObj.toLocaleDateString(); // Or use other formatting options like toLocaleString() or toLocaleTimeString()
  };

  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <a href="">
              <Link to="/">
                <img src={logo} alt="" className="img-fluid"></img>
              </Link>
            </a>
            AniScholar
          </div>
        </div>
      </header>
      {blog ? (
        <main id="main">
          <section className="breadcrumbs">
            <div className="container">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a>
                    <Link to="/blogs">Blogs</Link>
                  </a>
                </li>
                <li>Blog Detail</li>
              </ol>
            </div>
          </section>

          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div className="col-lg-12 entries">
                  <article className="entry entry-single">
                    <div className="entry-img">
                      <img
                        id="blogImage"
                        src={blog.image}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="">
                      <h2 className="entry-title" id="blogTitle">
                        {blog.title}
                      </h2>
                      <h2 className="entry-title" id="blogTitle"></h2>
                      <p id="blogAuthor" className="mb-1">
                        By {blog.author}
                      </p>
                      <p id="blogDate">on {formatDate(blog.date)}</p>
                      <p id="blogTeaser"></p>
                      <blockquote>
                        <p id="quote">{blog.fun_fact}</p>
                      </blockquote>
                      <h3>Et quae iure vel ut odit alias.</h3>
                      <div id="blogContent"></div>
                      <h3 id="subtitle"></h3>
                      <p id="paragraph2">{blog.description}</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div id="loadingSpinner" className="text-center">
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
          <p>Loading blog detail, please wait...</p>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
